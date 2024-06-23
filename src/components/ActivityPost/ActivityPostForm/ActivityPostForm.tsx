import classNames from 'classnames/bind';
import styles from './ActivityPostForm.module.scss';
import { useState, useRef, CSSProperties, ChangeEvent, FormEvent, MouseEvent } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Image } from './next/image';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import LongStroke from '@/images/icon/icon_stroke_long.svg';
import Stroke from '@/images/icon/icon_stroke.svg';
import { ROUTE, categoryList } from '@/constants';
import Button from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';
import { Dropdown } from '@/components/Dropdown/Dropdown';
import Textarea from '@/components/Textarea/Textarea';
import { DateInput, DateInputRef } from '@/components/DateInput/DateInput';
import AddImageBtn from '@/components/btns/AddImageBtn/AddImageBtn';
import ControlTimeBtn from '@/components/btns/ControlTimeBtn/ControlTimeBtn';
import DeleteBtn from '@/components/btns/DeleteBtn/DeleteBtn';
import { usePostActivity } from '@/apis/apiHooks/PostActivities';
import AddressInput from '@/components/AddressInput/AddressInput';
import AlertModal from '@/components/Popup/AlertModal/AlertModal';

const cn = classNames.bind(styles);

interface Schedule {
  date: Date;
  startTime: string;
  endTime: string;
}

interface FormData {
  title: string;
  category: string;
  description: string;
  address: string;
  price: string;
  schedules: Schedule[];
  bannerImageUrl: string | null;
  subImageUrls: string[];
  selectedDate?: Date;
  startTime?: string;
  endTime?: string;
}

export default function ActivityPostForm() {
  const isPc = useMediaQuery({ query: '(min-width: 767px)' });
  const router = useRouter();

  const initialState: FormData = {
    title: '',
    category: '투어',
    description: '',
    address: '',
    price: '',
    schedules: [],
    bannerImageUrl: null,
    subImageUrls: [],
  };

  const [formData, setFormData] = useState<FormData>(initialState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const { mutate: postActivity } = usePostActivity();
  const queryClient = useQueryClient();

  const dateInputRef = useRef<DateInputRef>(null);

  const handleChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBannerImageSelect = (imageUrl: string) => {
    handleChange('bannerImageUrl', imageUrl);
  };

  const handleIntroImageSelect = (imageUrl: string) => {
    if (formData.subImageUrls.length < 4) {
      handleChange('subImageUrls', [...formData.subImageUrls, imageUrl]);
    }
  };

  const handleDeleteBannerImageClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleChange('bannerImageUrl', null);
  };

  const handleDeleteIntroImageClick = (event: MouseEvent<HTMLButtonElement>, index: number) => {
    event.preventDefault();
    handleChange(
      'subImageUrls',
      formData.subImageUrls.filter((_, i) => i !== index),
    );
  };

  const handleControlTimeClick = () => {
    const { schedules, selectedDate, startTime, endTime } = formData;
    if (selectedDate && startTime && endTime) {
      const isDuplicate = schedules.some(
        (item) =>
          item.date.getTime() === selectedDate.getTime() && item.startTime === startTime && item.endTime === endTime,
      );

      if (!isDuplicate) {
        const newSchedule: Schedule = { date: selectedDate, startTime, endTime };
        handleChange('schedules', [...schedules, newSchedule]);
        if (dateInputRef.current) dateInputRef.current.reset();
      } else {
        alert('이미 선택된 시간대입니다.');
      }
    }
  };

  const handleDeleteItemClick = (index: number) => {
    handleChange(
      'schedules',
      formData.schedules.filter((_, i) => i !== index),
    );
  };

  const formatDate = (date: Date): string => {
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submitData = {
      ...formData,
      price: parseInt(formData.price, 10),
      schedules: formData.schedules.map((schedule) => ({
        date: schedule.date.toISOString().split('T')[0],
        startTime: schedule.startTime,
        endTime: schedule.endTime,
      })),
    };
    postActivity(submitData);
    localStorage.removeItem('bannerImageUrl');
    localStorage.removeItem('subImageUrl');
    setFormData(initialState);
    setModalMessage('체험 등록이 완료되었습니다.');
    setIsModalOpen(true);
    queryClient.invalidateQueries({ queryKey: ['myActivities'] });
    router.push(ROUTE.USER_ACTIVITIES);
  };

  const inputStyle: CSSProperties = {
    color: '#1b1b1b',
  };

  const deleteBtnStyle: CSSProperties = {
    position: 'absolute',
    top: '-1rem',
    right: '-1rem',
    zIndex: 1,
  };

  const menuItems = [
    '0:00',
    '1:00',
    '2:00',
    '3:00',
    '4:00',
    '5:00',
    '6:00',
    '7:00',
    '8:00',
    '9:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
  ];

  const categoryMenuItems = [...categoryList];

  return (
    <form onSubmit={handleSubmit}>
      <div className={cn('titleBox')}>
        <h1>내 체험 등록</h1>
        <Button type="primary" size="medium" htmlType="submit">
          등록하기
        </Button>
      </div>
      <div className={cn('formContainer')}>
        <Input
          type="text"
          placeholder="제목"
          sx={inputStyle}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('title', e.target.value)}
        />
        <Dropdown
          isLabelVisible={false}
          menuItems={categoryMenuItems}
          onSelect={(value) => handleChange('category', value)}
        />
        <Textarea
          placeholder="설명"
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleChange('description', e.target.value)}
        />
        <div className={cn('inputContainer')}>
          <label className={cn('label')}>가격</label>
          <Input
            type="text"
            placeholder="가격"
            sx={inputStyle}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('price', e.target.value)}
          />
        </div>
        <div className={cn('inputContainer')}>
          <label className={cn('label')}>주소</label>
          <AddressInput onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('address', e.target.value)} />
        </div>
        <label className={cn('label')}>예약 가능한 시간대</label>
        <div className={cn('reservationTimeWrapper')}>
          <div className={cn('reservationDateBox', 'commonWidth')}>
            <label className={cn('smallLabel')}>날짜</label>
            <DateInput dateText="YY/MM/DD" onChange={(date) => handleChange('selectedDate', date)} ref={dateInputRef} />
          </div>
          <div className={cn('reservationTimeContainer')}>
            <div className={cn('reservationTimeBox')}>
              <label className={cn('smallLabel')}>시작 시간</label>
              <Dropdown
                className={cn('dropdown')}
                isLabelVisible={false}
                menuItems={menuItems}
                onSelect={(value) => handleChange('startTime', value)}
                selectedValue={formData.startTime}
              />
            </div>
            {isPc && <p className={cn('wave')}>~</p>}
            <div className={cn('reservationTimeBox')}>
              <label className={cn('smallLabel')}>종료 시간</label>
              <Dropdown
                className={cn('dropdown')}
                isLabelVisible={false}
                menuItems={menuItems}
                onSelect={(value) => handleChange('endTime', value)}
                selectedValue={formData.startTime}
              />
            </div>
          </div>
          <div className={cn('controlTimeBtnContainer')}>
            <ControlTimeBtn type="plus" onClick={handleControlTimeClick} />
          </div>
        </div>
        {formData.schedules.length > 0 && (
          <>
            <div className={cn('selectedItems')}>
              {isPc ? <LongStroke /> : <Stroke />}
              {formData.schedules.map((item, index) => (
                <div key={index} className={cn('selectedItem')}>
                  <div className={cn('reservationDateBox')}>
                    <Input
                      className={cn('dateInputBox', 'commonWidth')}
                      type="text"
                      readOnly={true}
                      placeholder={formatDate(item.date)}
                      sx={inputStyle}
                    />
                  </div>
                  <div className={cn('reservationTimeContainer')}>
                    <div className={cn('reservationTimeBox')}>
                      <Input
                        className={cn('timeInputBox')}
                        type="text"
                        readOnly={true}
                        placeholder={item.startTime}
                        sx={inputStyle}
                      />
                    </div>
                    {isPc && <p>~</p>}
                    <div className={cn('reservationTimeBox')}>
                      <Input
                        className={cn('timeInputBox')}
                        type="text"
                        readOnly={true}
                        placeholder={item.endTime}
                        sx={inputStyle}
                      />
                    </div>
                  </div>
                  <ControlTimeBtn type="minus" onClick={() => handleDeleteItemClick(index)} />
                </div>
              ))}
            </div>
          </>
        )}
        <div className={cn('imageContainer')}>
          <label className={cn('label')}>배너 이미지</label>
          <div className={cn('bannerImagePreviewContainer')}>
            <AddImageBtn onImageSelect={handleBannerImageSelect} imageType="banner" />
            {formData.bannerImageUrl && (
              <div className={cn('imagePreviewBox')}>
                <DeleteBtn sx={deleteBtnStyle} onClick={handleDeleteBannerImageClick} />
                <Image className={cn('imagePreview')} src={formData.bannerImageUrl} alt="배너 이미지 미리보기" />
              </div>
            )}
          </div>
        </div>
        <div className={cn('imageContainer')}>
          <label className={cn('label')}>소개 이미지</label>
          <div className={cn('introImagePreviewContainer')}>
            <AddImageBtn onImageSelect={handleIntroImageSelect} imageType="intro" />
            {formData.subImageUrls.map((imageUrl, index) => (
              <div key={index} className={cn('imagePreviewBox')}>
                <DeleteBtn
                  sx={deleteBtnStyle}
                  onClick={(event: MouseEvent<HTMLButtonElement>) => handleDeleteIntroImageClick(event, index)}
                />
                <Image className={cn('imagePreview')} src={imageUrl} alt={`소개 이미지 ${index + 1} 미리보기`} />
              </div>
            ))}
          </div>
          <p className={cn('description')}>*이미지를 최소 4개 이상 제출해주세요.</p>
        </div>
      </div>
      <AlertModal
        alertMessage={modalMessage}
        onConfirm={() => setIsModalOpen(false)}
        handleModalOpen={() => setIsModalOpen(false)}
        isModalOpen={isModalOpen}
      />
    </form>
  );
}
