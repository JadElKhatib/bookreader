import React, { useState } from "react"
import { Button, Typography, Card, Space } from 'antd';
const { Title } = Typography;

export function Search(props) {
    const [title, setTitle] = useState('');
    const [arr, setArr] = useState([]);
    const readList = props.readList;
    const toReadList = props.toReadList;
    const curReadList = props.curReadList;
    const setReadList = props.setReadList;
    const setToReadList = props.setToReadList;
    const setCurReadList = props.setCurReadList;
    
    const searcher = async () => {
        const newTitle = title.replaceAll(' ', '+');
        const response = await fetch(`https://openlibrary.org/search.json?title=${newTitle}`);
        const jsonifiedResponse = await response.json();
        const docaccess = jsonifiedResponse.docs;
        const get = docaccess.map((t) => {
            let newInfo = {
                key: t.key,
                title: t.title,
                author: t.author_name?.length ? t.author_name[0] : 'No author name',
                firstsentence: t.first_sentence?.length ? t.first_sentence[0] : 'No first sentence available'
            }
            return newInfo;
        })

        setArr(get);
    }

    const addToReadList = (info) => {
        const newReadList = [...readList];
        if (!newReadList.includes(info)) {
            newReadList.push(info);
        }
        setReadList(newReadList);
    }

    const addToToReadList = (info) => {
        const newToReadList = [...toReadList];
        if (!newToReadList.includes(info)) {
            newToReadList.push(info);
        }
        setToReadList(newToReadList);
    }

    const addToCurReadList = (info) => {
        const newCurReadList = [...curReadList];
        if (!newCurReadList.includes(info)) {
            newCurReadList.push(info);
        }
        setCurReadList(newCurReadList);
    }

    return (
        <>
            <Title level={5}>
                &nbsp;<input type="text" onChange={e => setTitle(e.target.value)} style={{ width: 500, height: 25 }} />
                &nbsp;&nbsp;&nbsp;<Button onClick={searcher} style={{ height: 33 }}>Search</Button></Title>
            {arr.map((info) => {
                return (
                    <React.Fragment key={info.key}>
                        &nbsp;
                        <Space direction="vertical" size={16}>
                            <Card
                                style={{
                                    width: 1000,
                                    height: 320
                                }}
                            >
                                <div><Title level={5}>Title: {info.title}</Title> </div>
                                <div><Title level={5}>Author: {info.author}</Title></div>
                                <div><Title level={5}>First Sentence: {info.firstsentence.slice(0, 200) + '..'}</Title></div>
                                <br />
                                <br />
                                <br />
                                <div>
                                    <Button disabled={readList.some((book) => book.key === info.key)} onClick={() => { addToReadList(info) }}>Read</Button>
                                    <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>
                                    <Button disabled={toReadList.some((book) => book.key === info.key)} onClick={() => { addToToReadList(info) }}>Want To Read</Button>
                                    <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</>
                                    <Button disabled={curReadList.some((book) => book.key === info.key)} onClick={() => { addToCurReadList(info) }}>Currently Reading</Button>
                                </div>
                            </Card>
                        </Space>
                        <br />
                        <br />
                    </React.Fragment>
                )
            })}
        </>
    )
}