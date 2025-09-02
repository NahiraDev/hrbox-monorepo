import { Form } from '@heroui/react';
import { Link21 } from 'iconsax-react';

export const AwardForm = () =>{
  return(
    <Form
      className="w-full flex flex-col gap-6"
      id="create-award-form"
      onSubmit={formikCreateAward.handleSubmit}
    >
      <div className="flex gap-[52px] w-full">
        <div className="flex flex-col gap-1 w-1/2">
          <AppInput
            props={{
              label: 'Title',
              required: true,
              error: formikCreateAward.errors.Name,
              name: 'Name',
              placeholder: 'Please Enter Name ...',
              type: 'text',
              value: formikCreateAward.values.Name,
              formik: formikCreateAward,
            }}
          />
        </div>
        <div className="flex flex-col gap-1 w-1/2">
          <AppDatePicker
            props={{
              label: 'Date',
              required: true,
              error: formikCreateAward.errors.Date,
              name: 'Date',
              placeholder: 'Please Enter Date ...',
              formik: formikCreateAward,
            }}
          />
        </div>
      </div>
      <div className="flex gap-[52px] w-full">
        <div className="flex flex-col gap-1 w-1/2">
          <AppInput
            props={{
              label: 'Upload portfolio',
              required: true,
              error: formikCreateAward.errors.AttachmentUrl,
              name: 'AttachmentUrl',
              placeholder: 'Please Enter Attachment Portfolio ...',
              type: 'text',
              value: formikCreateAward.values.AttachmentUrl,
              formik: formikCreateAward,
              endContent: <Link21 size="24" />,
            }}
          />
        </div>
        <div className="flex flex-col gap-1 w-1/2" />
      </div>
      <div className="flex gap-14 w-full">
        <div className="flex flex-col gap-1 w-full">
          <AppTextArea
            props={{
              label: 'Description',
              required: true,
              error: formikCreateAward.errors.Comment,
              name: 'Comment',
              placeholder: 'Please Enter Description ...',
              value: formikCreateAward.values.Comment,
              formik: formikCreateAward,
            }}
          />
        </div>
      </div>
    </Form>
  )
}
