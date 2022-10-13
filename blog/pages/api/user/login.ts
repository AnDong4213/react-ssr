import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import request from 'service/fetch';
import { ironOptions } from 'config/index';
import { ISession } from 'pages/api/index';

async function login(req: NextApiRequest, res: NextApiResponse) {
  const { phone = '', verify = '' } = req.body;

  res.status(200).json({
    phone,
    verify,
    code: 0,
  });
}

export default withIronSessionApiRoute(login, ironOptions);
