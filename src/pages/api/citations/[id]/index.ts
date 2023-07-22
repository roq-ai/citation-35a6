import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { citationValidationSchema } from 'validationSchema/citations';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.citation
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getCitationById();
    case 'PUT':
      return updateCitationById();
    case 'DELETE':
      return deleteCitationById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getCitationById() {
    const data = await prisma.citation.findFirst(convertQueryToPrismaUtil(req.query, 'citation'));
    return res.status(200).json(data);
  }

  async function updateCitationById() {
    await citationValidationSchema.validate(req.body);
    const data = await prisma.citation.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteCitationById() {
    const data = await prisma.citation.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
