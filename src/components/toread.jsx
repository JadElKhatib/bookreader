import React from "react";
import { Button, Typography, Card, Space } from 'antd';
const { Title } = Typography;

export function ToRead(props) {
    const toReadList = props.toReadList;
    const setToReadList = props.setToReadList;

    const remove = (info) => {
        const newToReadList = toReadList.filter((book) => {
            return book.key !== info.key;
        })
        localStorage.setItem("toReadList", JSON.stringify(newToReadList));
        setToReadList(newToReadList);
    }
    return (
        <>
            {toReadList.map((info) => {
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
                                    <Button onClick={() => { remove(info) }}>Remove</Button>
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