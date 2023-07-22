import { OrganizationInterface } from 'interfaces/organization';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CitationInterface {
  id?: string;
  text_content: string;
  image_content?: string;
  organization_id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  user?: UserInterface;
  _count?: {};
}

export interface CitationGetQueryInterface extends GetQueryInterface {
  id?: string;
  text_content?: string;
  image_content?: string;
  organization_id?: string;
  user_id?: string;
}
