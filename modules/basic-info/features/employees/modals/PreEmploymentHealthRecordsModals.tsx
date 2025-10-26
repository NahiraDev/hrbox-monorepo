import { AppAutoComplete, AppButton, AppInput, AppModal, AppTextArea } from '@core/components';
import { NotificationFavorite } from 'iconsax-react';
import { useState } from 'react';

interface PreEmploymentHealthRecordsModalsProps {
  onSubmit: (newRecord: any) => void;
}

const PreEmploymentHealthRecordsModals: React.FC<PreEmploymentHealthRecordsModalsProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    type: '', drugAddiction: '', smoking: '', bloodType: '', gastrointestinal: '',
    alcohol: '', musculoskeletal: '', mentalHealth: '', bloodSugar: '', vitaminD: '',
    bloodPressure: '', liverEnzyme: '', audiometry: '', breathTest: '', visionTest: '',
    ecg: '', bloodLipid: '', bloodIron: '', attachedFile: '', date: '', description: ''
  });

  const handleInputChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const newRecord = {
      id: Date.now(),
      title: formData.type || 'New Pre-Employment Record',
      type: formData.type,
      date: formData.date,
      question: formData.description || 'No treatment required',
      titleButton: 'Edit',
      ...formData
    };
    onSubmit(newRecord);
  };

  return (
    <div className="flex flex-col gap-y-6 p-4 overflow-y-scroll max-h-[70vh]">
      <AppModal.Body>
          <div className="grid grid-cols-2 gap-x-10 gap-y-6">
            <AppAutoComplete
              props={{
                className: 'border border-[#DCF0F9]',
                label: 'Type',
                value: { value: formData.type },
                onChange: handleInputChange('type'),
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                className: 'border border-[#DCF0F9]',
                label: 'Drug Addiction',
                value: formData.drugAddiction,
                onChange: handleInputChange('drugAddiction'),
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                className: 'border border-[#DCF0F9]',
                label: 'Smoking',
                value: formData.smoking,
                onChange: handleInputChange('smoking'),
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                className: 'border border-[#DCF0F9]',
                label: 'Blood Type',
                value: formData.bloodType,
                onChange: handleInputChange('bloodType'),
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                className: 'border border-[#DCF0F9]',
                label: 'Gastrointestinal Disease',
                value: formData.gastrointestinal,
                onChange: handleInputChange('gastrointestinal'),
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                className: 'border border-[#DCF0F9]',
                label: 'Alcohol Consumption',
                value: formData.alcohol,
                onChange: handleInputChange('alcohol'),
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                className: 'border border-[#DCF0F9]',
                label: 'Musculoskeletal Disease',
                value: formData.musculoskeletal,
                onChange: handleInputChange('musculoskeletal'),
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                className: 'border border-[#DCF0F9]',
                label: 'Mental Health Condition',
                value: formData.mentalHealth,
                onChange: handleInputChange('mentalHealth'),
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                className: 'border border-[#DCF0F9]',
                label: 'Blood Sugar Level',
                value: formData.bloodSugar,
                onChange: handleInputChange('bloodSugar'),
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                className: 'border border-[#DCF0F9]',
                label: 'Vitamin D Level',
                value: formData.vitaminD,
                onChange: handleInputChange('vitaminD'),
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                className: 'border border-[#DCF0F9]',
                label: 'Blood Pressure',
                value: formData.bloodPressure,
                onChange: handleInputChange('bloodPressure'),
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                className: 'border border-[#DCF0F9]',
                label: 'Liver Enzyme Status',
                value: formData.liverEnzyme,
                onChange: handleInputChange('liverEnzyme'),
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                className: 'border border-[#DCF0F9]',
                label: 'Audiometry',
                value: formData.audiometry,
                onChange: handleInputChange('audiometry'),
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                className: 'border border-[#DCF0F9]',
                label: 'Breath Test',
                value: formData.breathTest,
                onChange: handleInputChange('breathTest'),
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                className: 'border border-[#DCF0F9]',
                label: 'Vision Test',
                value: formData.visionTest,
                onChange: handleInputChange('visionTest'),
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                className: 'border border-[#DCF0F9]',
                label: 'ECG',
                value: formData.ecg,
                onChange: handleInputChange('ecg'),
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                className: 'border border-[#DCF0F9]',
                label: 'Blood Lipid Level',
                value: formData.bloodLipid,
                onChange: handleInputChange('bloodLipid'),
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                className: 'border border-[#DCF0F9]',
                label: 'Blood Iron Level',
                value: formData.bloodIron,
                onChange: handleInputChange('bloodIron'),
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppInput
              props={{
                className: 'border border-[#DCF0F9]',
                label: 'Attached File',
                value: formData.attachedFile,
                onChange: handleInputChange('attachedFile'),
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
            <AppAutoComplete
              props={{
                className: 'border border-[#DCF0F9]',
                label: 'Date',
                value: { value: formData.date },
                onChange: handleInputChange('date'),
                size: 'lg',
                color: 'primary',
                radius: 'lg',
              }}
            />
          </div>
          <AppTextArea
            props={{
              className: 'border border-[#DCF0F9]',
              label: 'Descriptions and Achievements*',
              value: formData.description,
              onChange: handleInputChange('description'),
              size: 'lg',
              color: 'primary',
              radius: 'lg',
            }}
          />
      </AppModal.Body>
      <AppModal.Footer>
        <AppButton
          props={{
            size: 'xs',
            radius: 'sm',
            variant: 'light',
            onPress: () => {}, // Modal رو ببندید
            content: <span>Cancel</span>,
            className: 'text-Secondary-1000 py-1.5 px-3 text-xl rounded-lg hover:!bg-red-500 hover:text-white transition-all duration-200',
          }}
        />
        <AppButton
          props={{
            size: 'xs',
            radius: 'sm',
            variant: 'light',
            onPress: handleSubmit,
            content: <span>Submit</span>,
            className: 'bg-primary text-white py-1.5 px-3 text-xl rounded-lg',
          }}
        />
      </AppModal.Footer>
    </div>
  );
};

export default PreEmploymentHealthRecordsModals;
