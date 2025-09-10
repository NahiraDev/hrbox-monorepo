import { ArrowRight, Buildings, DeviceMessage, Heart, Location, Setting4, Star1 } from 'iconsax-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AppButton, AppPagination, AppSearchInput } from 'core/components';

import { useLazyFetchCompanyQuery } from './apis';

const Favorites = () => {
  const [fetchCompanies, { data }] = useLazyFetchCompanyQuery();
  const navigate = useNavigate();
  const [likedItems, setLikedItems] = useState<number[]>([]);
  const toggleLike = (id: number) => {
    setLikedItems((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]));
  };

  return (
    <div className="mx-auto w-full">
      <div className="flex flex-col justify-between gap-3.5 h-full">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <AppButton
              props={{
                color: 'primary',
                size: 'md',
                radius: 'md',
                content: (
                  <>
                    <Buildings className="text-white" size="22" />
                    <span className="text-white text-xl font-normal">All Companies</span>
                  </>
                ),
              }}
            />
            <AppButton
              props={{
                color: 'light',
                size: 'md',
                radius: 'md',
                onPress: navigate('/company/requested'),
                content: (
                  <>
                    <DeviceMessage className="text-secondary-400" size="22" />
                    <span className="text-secondary-400  text-xl font-normal">Requested</span>
                  </>
                ),
              }}
            />
            <AppButton
              props={{
                color: 'light',
                size: 'md',
                radius: 'md',
                onPress: navigate('/company/favorites'),
                content: (
                  <>
                    <Heart className="text-secondary-400" size="22" />
                    <span className="text-secondary-400 text-xl font-normal">Followed</span>
                  </>
                ),
              }}
            />
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-2">
              <AppSearchInput placeholder="Education" onSearch={(query) => fetchCompanies({ query })} />
            </div>
            <AppButton
              props={{
                color: 'white',
                size: 'md',
                radius: 'md',
                isIconOnly: true,
                content: <Setting4 className="text-secondary-1000 dark:text-white" />,
              }}
            />
          </div>
        </div>
        <div className="flex flex-col h-full justify-between">
          <div className="grid grid-cols-4 gap-3">
            {data &&
              data.map((company: any) => {
                const isLiked = likedItems.includes(company.id);

                return (
                  <button
                    key={company.id}
                    className="dark:bg-info-1000 rounded-5 shadow-shadow-light-tight/1 px-5 py-4 flex flex-col gap-2 cursor-pointer"
                    onClick={() => navigate('/company/general-info/' + company.name)}
                  >
                    <div className="flex justify-between border-b-1 border-neutral-100 pb-1">
                      <div className="flex items-center gap-2">
                        <img alt={`${company.name} Logo`} className="rounded-2 w-[22px] h-[22px]" src={company.logo} />
                        <span className="text-base font-semibold text-secondary-1000 leading-normal">
                          {company.name}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <AppButton
                          props={{
                            color: 'white',
                            size: 'md',
                            radius: 'md',
                            onPress: () => toggleLike(company.id),
                            content: (
                              <>
                                <Heart
                                  className={`transition-colors ${
                                    isLiked ? 'text-secondary-1000' : 'text-tertiar-400'
                                  }`}
                                  size={14}
                                  variant={isLiked ? 'Outline' : 'Bold'}
                                />
                              </>
                            ),
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex flex-col gap-4">
                        <span className="font-bold text-sm text-secondary-800 text-start">{company.title}</span>
                        <div className="flex gap-4">
                          <Location className="text-secondary-1000" size="20" />
                          <span className="text-secondary-800 font-normal text-sm">{company.location}</span>
                        </div>
                        <div className="flex gap-4">
                          <Star1 className="text-warning-400" size="20" />
                          <span className="text-secondary-800 font-normal text-sm">{company.score} Score</span>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <AppButton
                          props={{
                            color: 'white',
                            size: 'md',
                            radius: 'md',
                            onPress: navigate('/company/general-info/' + company.name),
                            content: (
                              <>
                                <span className="text-secondary-1000 text-xs font-normal">See More</span>
                                <ArrowRight size="12" />
                              </>
                            ),
                          }}
                        />
                      </div>
                    </div>
                  </button>
                );
              })}
          </div>
          <div className="flex justify-center">
            <AppPagination total={100} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
