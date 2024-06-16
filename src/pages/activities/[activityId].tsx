import { useGetActivity } from '@/apis/apiHooks/temporary';
import { useRouter } from 'next/router';
import styles from './Activity.module.scss';
import classNames from 'classnames/bind';
import KebabBtn from '@/components/btns/KebabBtn/KebabBtn';
import StarIcon from '@/images/icon/icon_star_on.svg';
import LocationIcon from '@/images/icon/icon_location.svg';
import Header from './_skeleton-ui/skeleton-header';
import { useRef, useState } from 'react';
import useOutsideClick from '@/hooks/useOutsideClick';
import Image from 'next/image';
import Map from '@/components/Map/Map';
import FloatingBox from '@/components/FloatingBox/FloatingBox';
import Pagination from '@/components/Pagination/Pagination';

const cn = classNames.bind(styles);

export default function Activity() {
  const router = useRouter();
  const { data, isLoading } = useGetActivity({ activityId: router.query.activityId?.toString() ?? '' });
  const [isPopoverOpened, setIsPopoverOpened] = useState(false);
  const popoverRef = useRef(null);

  const handleDeleteClick = () => {};

  const handleModifyClick = () => {};

  useOutsideClick({
    ref: popoverRef,
    onClick: () => {
      setIsPopoverOpened(false);
    },
  });

  return (
    <>
      {isLoading ? (
        <Header />
      ) : (
        <>
          <header className={cn('header')}>
            <div className={cn('header-contents')}>
              <div className={cn('category')}>{data?.category}</div>
              <h2 className={cn('title')}>{data?.title}</h2>
              <div className={cn('footer')}>
                <span className={cn('rating')}>
                  <StarIcon width={15} height={22} /> <span>({data?.reviewCount})</span>
                </span>
                <span className={cn('address')}>
                  <LocationIcon height={18} />
                  <span>{data?.address}</span>
                </span>
              </div>
            </div>
            <div className={cn('control')}>
              <KebabBtn
                id="kebab-btn"
                size={28}
                onClick={() => {
                  setIsPopoverOpened((toggle) => !toggle);
                }}
              />
              {isPopoverOpened && (
                <div ref={popoverRef} className={cn('popover')}>
                  <button onClick={handleModifyClick}>수정하기</button>
                  <button onClick={handleDeleteClick}>삭제하기</button>
                </div>
              )}
            </div>
          </header>
          <div className={cn('gallery')}>
            <div className={cn('cover')}>
              <Image fill src={data?.bannerImageUrl as string} alt="배너이미지" />
            </div>
            <div className={cn('subCovers')}>
              <div className={cn('subCovers-section')}>
                <div className={cn('subCover')}>
                  {data?.subImageUrls && data.subImageUrls[0] && (
                    <Image fill src={data?.bannerImageUrl as string} alt="배너이미지" />
                  )}
                </div>
                <div className={cn('subCover')}>
                  {data?.subImageUrls && data.subImageUrls[1] && (
                    <Image fill src={data?.bannerImageUrl as string} alt="배너이미지" />
                  )}
                </div>
              </div>
              <div className={cn('subCovers-section')}>
                <div className={cn('subCover')}>
                  {data?.subImageUrls && data.subImageUrls[2] && (
                    <Image fill src={data?.bannerImageUrl as string} alt="배너이미지" />
                  )}
                </div>
                <div className={cn('subCover')}>
                  {data?.subImageUrls && data.subImageUrls[3] && (
                    <Image fill src={data?.bannerImageUrl as string} alt="배너이미지" />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={cn('container')}>
            <div className={cn('contents')}>
              <div className={cn('descriptionContainer')}>
                <h3 className={cn('subTitle')}>체험 설명</h3>
                <p className={cn('activityDescription')}>{data?.description}</p>
              </div>
              <div className={cn('mapContainer')}>{data && <Map address={data?.address} />}</div>
              <div className={cn('reviewContaienr')}>
                <h3 className={cn('subTitle')}>후기</h3>
                <div className={cn('header')}>
                  <div className={cn('rating')}>{data?.rating}</div>
                  <div>
                    <div className={cn('satisfaction')}>매우 만족</div>
                    <div className={cn('reviewCount')}>
                      <StarIcon width={15} height={15} /> <span>1개의 후기</span>
                    </div>
                  </div>
                </div>
                <ul className={cn('reviews')}>
                  <li className={cn('review')}>
                    <div className={cn('profile')}></div>
                    <div className={cn('reviewContents')}>
                      <div className={cn('header')}>
                        <div className={cn('reviewer')}>김태야</div>
                        <div className={cn('date')}>2024-05-29</div>
                      </div>
                      <p className={cn('reviewDescription')}>
                        저는 저희 스트릿 댄서 체험에 참가하게 된 지 얼마 안됐지만, 정말 즐거운 시간을 보냈습니다. 새로운
                        스타일과 춤추기를 좋아하는 나에게 정말 적합한 체험이었고, 전문가가 직접 강사로 참여하기 때문에
                        어떤 수준의 춤추는 사람도 쉽게 이해할 수 있었습니다. 강사님께서 정말 친절하게 설명해주셔서 정말
                        좋았고, 이번 체험을 거쳐 새로운 스타일과 춤추기에 대한 열정이 더욱 생겼습니다. 저는 이 체험을
                        적극 추천합니다!
                      </p>
                    </div>
                  </li>
                  <li className={cn('review')}>
                    <div className={cn('profile')}></div>
                    <div className={cn('reviewContents')}>
                      <div className={cn('header')}>
                        <div className={cn('reviewer')}>김태야</div>
                        <div className={cn('date')}>2024-05-29</div>
                      </div>
                      <p className={cn('reviewDescription')}>
                        저는 저희 스트릿 댄서 체험에 참가하게 된 지 얼마 안됐지만, 정말 즐거운 시간을 보냈습니다. 새로운
                        스타일과 춤추기를 좋아하는 나에게 정말 적합한 체험이었고, 전문가가 직접 강사로 참여하기 때문에
                        어떤 수준의 춤추는 사람도 쉽게 이해할 수 있었습니다. 강사님께서 정말 친절하게 설명해주셔서 정말
                        좋았고, 이번 체험을 거쳐 새로운 스타일과 춤추기에 대한 열정이 더욱 생겼습니다. 저는 이 체험을
                        적극 추천합니다!
                      </p>
                    </div>
                  </li>
                  <li className={cn('review')}>
                    <div className={cn('profile')}></div>
                    <div className={cn('reviewContents')}>
                      <div className={cn('header')}>
                        <div className={cn('reviewer')}>김태야</div>
                        <div className={cn('date')}>2024-05-29</div>
                      </div>
                      <p className={cn('reviewDescription')}>
                        저는 저희 스트릿 댄서 체험에 참가하게 된 지 얼마 안됐지만, 정말 즐거운 시간을 보냈습니다. 새로운
                        스타일과 춤추기를 좋아하는 나에게 정말 적합한 체험이었고, 전문가가 직접 강사로 참여하기 때문에
                        어떤 수준의 춤추는 사람도 쉽게 이해할 수 있었습니다. 강사님께서 정말 친절하게 설명해주셔서 정말
                        좋았고, 이번 체험을 거쳐 새로운 스타일과 춤추기에 대한 열정이 더욱 생겼습니다. 저는 이 체험을
                        적극 추천합니다!
                      </p>
                    </div>
                  </li>
                </ul>
                <div className={cn('paginationContainer')}>
                  <Pagination total={20} />
                </div>
              </div>
            </div>
            <div className={cn('sidebar')}>{data && <FloatingBox price={data?.price} />}</div>
          </div>
        </>
      )}
    </>
  );
}
