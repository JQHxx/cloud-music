import React from 'react';
import { ListWrapper, List, ListItem } from './style';

function RecommendList(props) {
  const { recommendList } = props;
  return (
    <ListWrapper>
      <h1 className="title">推荐歌单</h1>
      <List>
        {
          recommendList.map(item => {
            return (
              <ListItem key={item.id}>
                
              </ListItem>
            )
          })
        }
      </List>
    </ListWrapper>
  );
}

export default React.memo(RecommendList);