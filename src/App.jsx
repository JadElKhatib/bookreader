import { Flex, List, Typography } from 'antd';
import React, { useState } from 'react';
const { Title } = Typography;

import { Search } from './components/search';
import { Read } from './components/read';
import { ToRead } from './components/toread';
import { CurrentlyReading } from './components/currentlyreading';

const pages = [
  {
    mode: 'search',
    title: 'Search'
  },
  {
    mode: 'read',
    title: 'Read'
  },
  {
    mode: 'toread',
    title: 'To Read'
  },
  {
    mode: 'currentlyreading',
    title: 'Currently Reading'
  }
]

const App = () => {
  const [mode, setMode] = useState('');

  const [readList, setReadList] = useState([]);
  const [toReadList, setToReadList] = useState([]);
  const [curReadList, setCurReadList] = useState([]);

  return (
    <>
      <Title>BookTracker</Title>
      <hr />
      <Flex>
        <List
          itemLayout="horizontal"
          dataSource={pages}
          renderItem={(page) => (
            <List.Item onClick={() => {
              setMode(page.mode);
            }}>
              <Title level={4}>{page.title}</Title>
            </List.Item>
          )}
        />
        <div>
          {mode === 'search' && <Search readList={readList} toReadList={toReadList} curReadList={curReadList} setReadList={setReadList} setToReadList={setToReadList} setCurReadList={setCurReadList} />}
          {mode === 'read' && <Read />}
          {mode === 'toread' && <ToRead />}
          {mode === 'currentlyreading' && <CurrentlyReading />}
        </div>
      </Flex>
    </>
  )
};

export default App;
