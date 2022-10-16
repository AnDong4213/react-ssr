import { ChangeEvent, useState, useCallback } from 'react';
import { message, Button } from 'antd';
import { observer } from 'mobx-react-lite';
import request from 'service/fetch';
import { useStore } from 'store/index';
import CountDown from 'components/CountDown';
import styles from './index.module.scss';

interface IProps {
  isShow: boolean;
  onClose: Function;
}

const Login = (props: IProps) => {
  const store = useStore();
  const { isShow = false, onClose } = props;
  const [isShowVerifyCode, setIsShowVerifyCode] = useState(false);
  const [form, setForm] = useState({
    phone: '',
    verify: '',
  });
  const [disBtn, setDisBtn] = useState(false);

  const handleClose = () => {
    onClose && onClose();
  };

  const handleGetVerifyCode = () => {
    if (!form?.phone.trim()) {
      message.warning('请输入手机号');
      return;
    }

    setIsShowVerifyCode(true);
    request
      .post('/api/user/sendVerifyCode', {
        to: form.phone,
        templateId: 1,
      })
      .then((res: any) => {
        console.log(res);
        if (res?.code === 0) {
          setIsShowVerifyCode(true);
        } else {
          message.error(res?.msg || '未知错误');
          setIsShowVerifyCode(false);
        }
      });
  };

  const handleCountDownEnd = useCallback(() => {
    setTimeout(() => {
      setIsShowVerifyCode(false);
    });
  }, []);

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleLogin = () => {
    if (!form?.phone.trim()) {
      message.warning('请输入手机号');
      return;
    }
    if (!form?.verify.trim()) {
      message.warning('请输入验证码');
      return;
    }
    setDisBtn(true);

    request
      .post('/api/user/login', {
        ...form,
        identity_type: 'phone',
      })
      .then((res: any) => {
        if (res?.code === 0) {
          console.log(res);
          store.user.setUserInfo(res.data);
          // console.log(store);
          onClose && onClose();
        } else {
          message.error(res?.msg || '未知错误');
        }
        setDisBtn(false);
      });
  };

  // https://github.com/settings/applications/2018438
  // 26dbc7225a9a7297fabf2bc36592166bbc0bfcfb
  // Client ID  ff43e4bab3f5e0fe68bc

  const handleOAuthGithub = () => {};

  return isShow ? (
    <div className={styles.loginArea}>
      <div className={styles.loginBox}>
        <div className={styles.loginTitle}>
          <div>手机号登录</div>
          <div className={styles.close} onClick={handleClose}>
            x
          </div>
        </div>
        <input
          type="text"
          name="phone"
          placeholder="请输入手机号"
          value={form.phone}
          onChange={handleFormChange}
        />

        <div className={styles.verifyCodeArea}>
          <input
            name="verify"
            type="text"
            placeholder="请输入验证码"
            value={form.verify}
            onChange={handleFormChange}
          />
          <span className={styles.verifyCode} onClick={handleGetVerifyCode}>
            {isShowVerifyCode ? (
              <CountDown time={10} onEnd={handleCountDownEnd} />
            ) : (
              '获取验证码'
            )}
          </span>
        </div>

        <Button
          type="primary"
          className={styles.loginBtn}
          onClick={handleLogin}
          loading={disBtn}
        >
          登录
        </Button>

        <div className={styles.otherLogin} onClick={handleOAuthGithub}>
          使用 Github 登录
        </div>

        <div className={styles.loginPrivacy}>
          注册登录即表示同意
          <a
            href="https://moco.imooc.com/privacy.html"
            target="_blank"
            rel="noreferrer"
          >
            隐私政策
          </a>
        </div>
      </div>
    </div>
  ) : null;
};

export default observer(Login);
