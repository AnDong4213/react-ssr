import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Tabs, Button, message } from 'antd';
import * as ANTD_ICONS from '@ant-design/icons';
import { useStore } from 'store/index';
import request from 'service/fetch';
import styles from './index.module.scss';

const { TabPane } = Tabs;
console.log('ANTD_ICONS---', ANTD_ICONS);
interface IUser {
  id: number;
  nickname: string;
  avatar: string;
}

interface ITag {
  id: number;
  title: string;
  icon: string;
  follow_count: number;
  article_count: number;
  users: IUser[];
}

const Tag = () => {
  const store = useStore();
  const [followTags, setFollowTags] = useState<ITag[]>();
  const [allTags, setAllTags] = useState<ITag[]>();
  const [needRefresh, setNeedRefresh] = useState(false);
  const { userId } = store?.user?.userInfo || {};

  useEffect(() => {
    request('/api/tag/get').then((res: any) => {
      if (res?.code === 0) {
        const { followTags = [], allTags = [] } = res?.data || {};
        setFollowTags(followTags);
        setAllTags(allTags);
      }
    });
  }, []);

  const handleUnFollow = (tagId: number) => {};

  const handleFollow = (tagId: number) => {};

  const items = [
    {
      label: '已关注标签',
      key: 'follow',
      children: (
        <div className={styles.tags}>
          {followTags?.map((tag) => (
            <div key={tag?.title} className={styles.tagWrapper}>
              <div>{(ANTD_ICONS as any)[tag?.icon]?.render()}</div>
              <div className={styles.title}>{tag?.title}</div>
              <div>
                {tag?.follow_count} 关注 {tag?.article_count} 文章
              </div>
              {tag?.users?.find(
                (user) => Number(user?.id) === Number(userId)
              ) ? (
                <Button type="primary" onClick={() => handleUnFollow(tag?.id)}>
                  已关注
                </Button>
              ) : (
                <Button onClick={() => handleFollow(tag?.id)}>关注</Button>
              )}
            </div>
          ))}
        </div>
      ),
    },
    {
      label: '全部标签',
      key: 'all',
      children: (
        <div className={styles.tags}>
          {allTags?.map((tag) => (
            <div key={tag?.title} className={styles.tagWrapper}>
              <div>{(ANTD_ICONS as any)[tag?.icon]?.render()}</div>
              <div className={styles.title}>{tag?.title}</div>
              <div>
                {tag?.follow_count} 关注 {tag?.article_count} 文章
              </div>
              {tag?.users?.find(
                (user) => Number(user?.id) === Number(userId)
              ) ? (
                <Button type="primary" onClick={() => handleUnFollow(tag?.id)}>
                  已关注
                </Button>
              ) : (
                <Button onClick={() => handleFollow(tag?.id)}>关注</Button>
              )}
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="content-layout">
      <Tabs defaultActiveKey="all" items={items}></Tabs>
    </div>
  );
};

export default observer(Tag);
