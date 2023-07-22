import * as yup from 'yup';

export const citationValidationSchema = yup.object().shape({
  text_content: yup.string().required(),
  image_content: yup.string(),
  organization_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
