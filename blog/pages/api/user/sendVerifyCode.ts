import { NextApiRequest, NextApiResponse } from 'next';
import md5 from 'md5';
import { encode } from 'js-base64';
import { format } from 'date-fns';
import { withIronSessionApiRoute } from 'iron-session/next';
import request from 'service/fetch';
import { ironOptions } from 'config/index';
import { ISession } from 'pages/api/index';

async function sendVerifyCode(req: NextApiRequest, res: NextApiResponse) {
  const session: ISession = req.session;
  const { to = '', templateId = '1' } = req.body;

  const AppId = '8aaf070883c5db6a0183c74970ff0027';

  const AccountId = '8aaf070883c5db6a0183c7496fff0020';
  const AuthToken = 'fc933e2cbcd64ec0afd48465b57a1e40';
  const NowDate = format(new Date(), 'yyyyMMddHHmmss');
  const SigParameter = md5(`${AccountId}${AuthToken}${NowDate}`);

  const Authorization = encode(`${AccountId}:${NowDate}`);

  const verifyCode = Math.floor(Math.random() * (9999 - 1000)) + 1000;
  const expireMinute = '5';

  console.log(to, templateId, NowDate, SigParameter, Authorization);
  const url = `https://app.cloopen.com:8883/2013-12-26/Accounts/${AccountId}/SMS/TemplateSMS?sig=${SigParameter}`;

  const response: any = await request.post(
    url,
    {
      to,
      templateId,
      appId: AppId,
      datas: [verifyCode, expireMinute],
    },
    {
      headers: {
        Authorization,
      },
    }
  );

  console.log('response---', response, verifyCode);

  const { statusCode, templateSMS, statusMsg } = response;

  if (statusCode === '000000') {
    session.verifyCode = verifyCode;
    await session.save();
    res.status(200).json({
      code: 0,
      msg: statusMsg,
      data: {
        templateSMS,
      },
    });
  } else {
    res.status(200).json({
      code: statusCode,
      msg: statusMsg,
    });
  }
}

export default withIronSessionApiRoute(sendVerifyCode, ironOptions);
