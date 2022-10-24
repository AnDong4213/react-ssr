/*
Navicat MySQL Data Transfer

Source Server         : zad
Source Server Version : 80013
Source Host           : localhost:3306
Source Database       : react_ssr

Target Server Type    : MYSQL
Target Server Version : 80013
File Encoding         : 65001

Date: 2022-10-24 11:00:27
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for articles
-- ----------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` text,
  `views` int(11) DEFAULT NULL,
  `is_delete` bit(1) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of articles
-- ----------------------------
INSERT INTO `articles` VALUES ('3', '图片展示', '![](http://localhost:3000/3.png)\n\n\n`\nconst a = 9\n`', '24', '\0', '2022-10-19 10:50:59', '2022-10-19 10:50:59', '5');
INSERT INTO `articles` VALUES ('4', '小姐姐', '![](http://localhost:3000/images/1.jpg)\n\n\n`\nconst hr = 99;\n\nnew Promise()\n`', '17', '\0', '2022-10-19 10:57:22', '2022-10-23 16:52:09', '5');
INSERT INTO `articles` VALUES ('5', '哈哈哈嘿嘿', '***坚果蛋糕***\n\n`const age = 21;\nconsole.log(11)\n`\n\n![](http://localhost:3000/images/1.jpg)', '12', '\0', '2022-10-19 11:23:05', '2022-10-19 11:23:05', '3');
INSERT INTO `articles` VALUES ('6', '哈哈测试修改更新文章哦哦', '> ***哈哈测试修改更新文章***\n\n\n`const [comments, setComments] = useState(article?.comments);`\n\n\n![](http://localhost:3000/3.png)', '14', '\0', '2022-10-19 12:04:10', '2022-10-19 12:21:39', '3');
INSERT INTO `articles` VALUES ('7', '小玉的文章', '*容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。*\n\n项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。', '8', '\0', '2022-10-19 14:15:55', '2022-10-19 14:15:55', '6');
INSERT INTO `articles` VALUES ('8', '标签文章-1', '***\n\n> flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。\n\n***', '0', '\0', '2022-10-23 15:57:02', '2022-10-23 15:57:02', '3');
INSERT INTO `articles` VALUES ('9', '我的主页的文章', '`<draggable \n  v-model=\"myArray\" \n  group=\"people\" \n  @start=\"drag=true\" \n  @end=\"drag=false\" \n  item-key=\"id\">\n  <template #item=\"{element}\">\n    <div>{{element.name}}</div>\n   </template>\n</draggable>`', '1', '\0', '2022-10-24 09:41:46', '2022-10-24 09:41:46', '6');

-- ----------------------------
-- Table structure for articles_tags_rel
-- ----------------------------
DROP TABLE IF EXISTS `articles_tags_rel`;
CREATE TABLE `articles_tags_rel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tag_id` int(11) DEFAULT NULL,
  `article_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of articles_tags_rel
-- ----------------------------
INSERT INTO `articles_tags_rel` VALUES ('1', '1', '8');
INSERT INTO `articles_tags_rel` VALUES ('2', '3', '8');
INSERT INTO `articles_tags_rel` VALUES ('3', '6', '8');
INSERT INTO `articles_tags_rel` VALUES ('4', '1', '4');
INSERT INTO `articles_tags_rel` VALUES ('5', '2', '4');
INSERT INTO `articles_tags_rel` VALUES ('6', '1', '9');
INSERT INTO `articles_tags_rel` VALUES ('7', '5', '9');
INSERT INTO `articles_tags_rel` VALUES ('8', '7', '9');
INSERT INTO `articles_tags_rel` VALUES ('9', '8', '9');

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text,
  `create_time` datetime DEFAULT NULL,
  `update_time` datetime DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `article_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comments
-- ----------------------------
INSERT INTO `comments` VALUES ('1', '小姐姐好漂亮哟', '2022-10-19 16:05:56', '2022-10-19 16:05:56', '6', '4');
INSERT INTO `comments` VALUES ('2', '小姐姐漂亮', '2022-10-19 16:17:25', '2022-10-19 16:17:25', '3', '4');

-- ----------------------------
-- Table structure for tags
-- ----------------------------
DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `follow_count` int(11) DEFAULT NULL,
  `article_count` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tags
-- ----------------------------
INSERT INTO `tags` VALUES ('1', 'HTML', 'Html5Outlined', '3', '3');
INSERT INTO `tags` VALUES ('2', 'Android', 'AndroidOutlined', '0', '1');
INSERT INTO `tags` VALUES ('3', 'Apple', 'AppleOutlined', '0', '1');
INSERT INTO `tags` VALUES ('4', 'Twitter', 'TwitterOutlined', '0', '0');
INSERT INTO `tags` VALUES ('5', 'Weibo', 'WeiboSquareOutlined', '1', '1');
INSERT INTO `tags` VALUES ('6', 'Qq', 'QqOutlined', '0', '1');
INSERT INTO `tags` VALUES ('7', 'Google', 'GoogleOutlined', '0', '1');
INSERT INTO `tags` VALUES ('8', 'Alibaba', 'AlibabaOutlined', '1', '1');
INSERT INTO `tags` VALUES ('9', 'Alipay', 'AlipayCircleOutlined', '1', '0');
INSERT INTO `tags` VALUES ('10', 'Wechat', 'WechatOutlined', '1', '0');

-- ----------------------------
-- Table structure for tags_users_rel
-- ----------------------------
DROP TABLE IF EXISTS `tags_users_rel`;
CREATE TABLE `tags_users_rel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tag_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tags_users_rel
-- ----------------------------
INSERT INTO `tags_users_rel` VALUES ('1', '1', '3');
INSERT INTO `tags_users_rel` VALUES ('2', '1', '5');
INSERT INTO `tags_users_rel` VALUES ('3', '9', '5');
INSERT INTO `tags_users_rel` VALUES ('4', '10', '5');
INSERT INTO `tags_users_rel` VALUES ('5', '1', '6');
INSERT INTO `tags_users_rel` VALUES ('6', '8', '6');
INSERT INTO `tags_users_rel` VALUES ('7', '5', '6');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nickname` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `introduce` varchar(255) DEFAULT NULL,
  `job` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'andong', '/image/xxx.png', '我是谁', '全栈工程师');
INSERT INTO `users` VALUES ('2', '小玉', '/image/xxx.png', '小玉', '专利');
INSERT INTO `users` VALUES ('3', '用户_8202', '/images/avatar.png', '暂无', '暂无');
INSERT INTO `users` VALUES ('5', 'AnDong', 'https://avatars.githubusercontent.com/u/10174842?v=4', 'React，Vue，NodeJs，小程序', '高级前端工程师');
INSERT INTO `users` VALUES ('6', '用户_3901', '/images/2.jpg', '暂无', '暂无');

-- ----------------------------
-- Table structure for user_auths
-- ----------------------------
DROP TABLE IF EXISTS `user_auths`;
CREATE TABLE `user_auths` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `identity_type` varchar(255) DEFAULT NULL,
  `identifier` varchar(255) DEFAULT NULL,
  `credential` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_auths
-- ----------------------------
INSERT INTO `user_auths` VALUES ('2', '3', 'phone', '15810392326', '9847');
INSERT INTO `user_auths` VALUES ('4', '5', 'github', 'ff43e4bab3f5e0fe68bc', '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');
INSERT INTO `user_auths` VALUES ('5', '6', 'phone', '15801628022', '7757');
