import classNames from 'classnames/bind';
import styles from './ActivityEditForm.module.scss';
import { useState, useRef, CSSProperties, ChangeEvent, FormEvent, MouseEvent, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useQueryClient } from '@tanstack/react-query';

import { TIME_MENU_ITEMS, categoryList, ROUTE } from '@/constants';
import LongStroke from '@/images/icon/icon_stroke_long.svg';
import Stroke from '@/images/icon/icon_stroke.svg';
import Button from '@/components/Button/Button';
import Dropdown from '@/components/Dropdown/Dropdown';
import Textarea from '@/components/Textarea/Textarea';
import AddImageBtn from '@/components/btns/AddImageBtn/AddImageBtn';
import ControlTimeBtn from '@/components/btns/ControlTimeBtn/ControlTimeBtn';
import DeleteBtn from '@/components/btns/DeleteBtn/DeleteBtn';
import AlertModal from '@/components/Popup/AlertModal/AlertModal';
import AddressInput from '@/components/AddressInput/AddressInput';
import { Input } from '@/components/Input/Input';
import { DateInput, DateInputRef } from '@/components/DateInput/DateInput';
import { useGetActivity } from '@/apis/apiHooks/temporary';
import { useEditActivity } from '@/apis/apiHooks/PostActivities';

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
  subImages: {
    id: number;
    imageUrl: string;
  }[];
  selectedDate?: Date;
  startTime?: string;
  endTime?: string;
}

export default function ActivityEditForm() {
  const router = useRouter();
  const isPc = useMediaQuery({ query: '(min-width: 767px)' });
  const queryClient = useQueryClient();

  const { data: activityData } = useGetActivity({ activityId: router.query.activityId?.toString() ?? '' });
  const { mutate: editActivity } = useEditActivity({ activityId: router.query.activityId?.toString() ?? '' });

  const [formData, setFormData] = useState<FormData>({
    title: activityData?.title ?? '',
    category: activityData?.category ?? '투어',
    description: activityData?.description ?? '',
    address: activityData?.address ?? '',
    price: activityData?.price.toString() ?? '',
    schedules:
      activityData?.schedules.map((schedule) => ({
        date: new Date(schedule.date),
        startTime: schedule.startTime,
        endTime: schedule.endTime,
      })) ?? [],
    bannerImageUrl: activityData?.bannerImageUrl ?? null,
    subImages: activityData?.subImages ?? [],
    selectedDate: undefined,
    startTime: '0:00',
    endTime: '0:00',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [subImageIdsToRemove, setSubImageIdsToRemove] = useState<number[]>([]);
  const [subImageUrlsToAdd, setSubImageUrlsToAdd] = useState<string[]>([]);
  const [scheduleIdsToRemove, setScheduleIdsToRemove] = useState<number[]>([]);
  const [schedulesToAdd, setSchedulesToAdd] = useState<Schedule[]>([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const dateInputRef = useRef<DateInputRef>(null);

  useEffect(() => {
    if (activityData) {
      setFormData({
        title: activityData.title,
        category: activityData.category,
        description: activityData.description,
        address: activityData.address,
        price: activityData.price.toString(),
        schedules: activityData.schedules.map((schedule) => ({
          date: new Date(schedule.date),
          startTime: schedule.startTime,
          endTime: schedule.endTime,
        })),
        bannerImageUrl: activityData.bannerImageUrl,
        subImages: activityData.subImages,
        selectedDate: undefined,
        startTime: '0:00',
        endTime: '0:00',
      });
    }
  }, [activityData]);

  const handleBannerImageSelect = (bannerImageUrl: string) => {
    setFormData((prev) => ({ ...prev, bannerImageUrl }));
  };

  const handleIntroImageSelect = (imageUrl: string) => {
    if (formData.subImages.length < 4) {
      setFormData((prev) => ({ ...prev, subImages: [...formData.subImages, { id: prev.subImages.length, imageUrl }] }));

      if (imageUrl.startsWith('http')) {
        setSubImageUrlsToAdd((prev) => [...prev, imageUrl]);
      }
    }
  };

  const handleDeleteBannerImageClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setFormData((prev) => ({ ...prev, bannerImageUrl: null }));
  };

  const handleDeleteIntroImageClick = (event: MouseEvent<HTMLButtonElement>, index: number) => {
    event.preventDefault();
    const deletedSubImageId = formData.subImages[index].id;
    setSubImageIdsToRemove((prev) => [...prev, deletedSubImageId]);

    const updatedSubImages = formData.subImages.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, subImages: updatedSubImages }));
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
        setSchedulesToAdd((prev) => [...prev, newSchedule]);
        const updatedSchedules = [...schedules, newSchedule];
        setFormData((prev) => ({ ...prev, schedules: updatedSchedules }));
        if (dateInputRef.current) dateInputRef.current.reset();

        setFormData((prev) => ({ ...prev, selectedDate: undefined }));
        setFormData((prev) => ({ ...prev, startTime: '0:00' }));
        setFormData((prev) => ({ ...prev, endTime: '0:00' }));
      } else {
        alert('이미 선택된 시간대입니다.');
      }
    }
  };

  const handleDeleteItemClick = (index: number) => {
    if (activityData) {
      const deletedScheduleId = activityData.schedules[index].id;
      setScheduleIdsToRemove((prev) => [...prev, deletedScheduleId]);
      setFormData((prev) => ({ ...prev, schedules: formData.schedules.filter((_, i) => i !== index) }));
    }
  };

  const formatDate = (date: Date): string => {
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formattedSchedulesToAdd = schedulesToAdd.map((schedule) => ({
      date: schedule.date.toISOString().split('T')[0],
      startTime: schedule.startTime,
      endTime: schedule.endTime,
    }));

    const submitData = {
      ...formData,
      price: parseInt(formData.price, 10),
      schedules: formData.schedules.map((schedule) => ({
        date: schedule.date.toISOString().split('T')[0],
        startTime: schedule.startTime,
        endTime: schedule.endTime,
      })),
      subImageIdsToRemove: subImageIdsToRemove,
      subImageUrlsToAdd: subImageUrlsToAdd,
      scheduleIdsToRemove: scheduleIdsToRemove,
      schedulesToAdd: formattedSchedulesToAdd,
      subImageUrls: formData.subImages.map((subImage) => subImage.imageUrl),
    };

    editActivity(submitData, {
      onSuccess: () => {
        setModalMessage('체험 수정이 완료되었습니다.');
        setIsModalOpen(true);
        setIsFormSubmitted(true);
      },
      onError: () => {
        setIsModalOpen(false);
      },
    });
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    if (isFormSubmitted) {
      router.push(ROUTE.USER_ACTIVITIES);
      queryClient.invalidateQueries({ queryKey: ['myActivities', 'activity-detail'] });
    }
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

  const categoryMenuItems = [...categoryList];

  return (
    <form onSubmit={handleSubmit}>
      <div className={cn('titleBox')}>
        <h1>내 체험 수정</h1>
        <Button type="primary" size="medium" htmlType="submit">
          수정하기
        </Button>
      </div>
      <div className={cn('formContainer')}>
        <Input
          type="text"
          placeholder="제목"
          sx={inputStyle}
          value={formData.title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
        />
        <Dropdown
          isLabelVisible={false}
          menuItems={categoryMenuItems}
          selectedValue={formData.category}
          onSelect={(index) => setFormData((prev) => ({ ...prev, category: categoryMenuItems[index] }))}
        />
        <Textarea
          placeholder="설명"
          value={formData.description}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
        />
        <div className={cn('inputContainer')}>
          <label className={cn('label')}>가격</label>
          <Input
            type="text"
            placeholder="가격"
            sx={inputStyle}
            value={formData.price}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
          />
        </div>
        <div className={cn('inputContainer')}>
          <label className={cn('label')}>주소</label>
          <AddressInput
            value={formData.address}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFormData((prev) => ({ ...prev, address: e.target.value }))
            }
            placeholder={formData.address}
          />
        </div>
        <label className={cn('label')}>예약 가능한 시간대</label>
        <div className={cn('reservationTimeWrapper')}>
          <div className={cn('reservationDateBox', 'commonWidth')}>
            <label className={cn('smallLabel')}>날짜</label>
            <DateInput
              dateText="YY/MM/DD"
              onChange={(date) => setFormData((prev) => ({ ...prev, selectedDate: date }))}
              ref={dateInputRef}
            />
          </div>
          <div className={cn('reservationTimeContainer')}>
            <div className={cn('reservationTimeBox')}>
              <label className={cn('smallLabel')}>시작 시간</label>
              <Dropdown
                className={cn('dropdown')}
                isLabelVisible={false}
                menuItems={TIME_MENU_ITEMS}
                selectedValue={formData.startTime}
                onSelect={(index) => setFormData((prev) => ({ ...prev, startTime: TIME_MENU_ITEMS[index] }))}
              />
            </div>
            {isPc && <div className={cn('separator')}>~</div>}
            <div className={cn('reservationTimeBox')}>
              <label className={cn('smallLabel')}>종료 시간</label>
              <Dropdown
                className={cn('dropdown')}
                isLabelVisible={false}
                menuItems={TIME_MENU_ITEMS}
                selectedValue={formData.endTime}
                onSelect={(index) => setFormData((prev) => ({ ...prev, endTime: TIME_MENU_ITEMS[index] }))}
              />
            </div>
          </div>
          <div className={cn('controlTimeBtnContainer')}>
            <ControlTimeBtn type="plus" onClick={handleControlTimeClick} />
          </div>
        </div>
        {formData?.schedules?.length > 0 && (
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
                    {isPc && <div className={cn('wave')}>~</div>}
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
                <Image
                  className={cn('imagePreview')}
                  width="180"
                  height="180"
                  src={formData.bannerImageUrl}
                  alt="배너 이미지 미리보기"
                />
              </div>
            )}
          </div>
        </div>
        <div className={cn('imageContainer')}>
          <label className={cn('label')}>소개 이미지</label>
          <div className={cn('introImagePreviewContainer')}>
            <AddImageBtn onImageSelect={handleIntroImageSelect} imageType="intro" />
            {formData.subImages.map((image, index) => (
              <div key={index} className={cn('imagePreviewBox')}>
                <DeleteBtn
                  sx={deleteBtnStyle}
                  onClick={(event: MouseEvent<HTMLButtonElement>) => handleDeleteIntroImageClick(event, index)}
                />
                <Image
                  className={cn('imagePreview')}
                  width="180"
                  height="180"
                  src={image.imageUrl}
                  alt={`소개 이미지 ${index + 1} 미리보기`}
                />
              </div>
            ))}
          </div>
          <p className={cn('description')}>*이미지를 최소 4개 이상 제출해주세요.</p>
        </div>
      </div>
      <AlertModal
        alertMessage={modalMessage}
        onConfirm={handleModalConfirm}
        handleModalOpen={() => setIsModalOpen(false)}
        isModalOpen={isModalOpen}
      />
    </form>
  );
}
