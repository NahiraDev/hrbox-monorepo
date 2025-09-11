import { ArrowRight, DocumentForward, Heart, Location, Star1 } from 'iconsax-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AppButton, AppPagination } from 'core/components';
import { Card, CardBody, CardHeader } from '@heroui/react';

import { useLazyFetchCompanyQuery, useSendRequestMutation } from './apis';

const Companies = () => {
  const [fetchCompanies, { data }] = useLazyFetchCompanyQuery();
  const [sendRequest] = useSendRequestMutation();
  const [likedItems, setLikedItems] = useState<number[]>([]);
  const navigate = useNavigate();

  const toggleLike = (id: number) => {
    setLikedItems((prev) => (prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]));
  };

  const handleOpenCompany = (id: string) => {
    navigate('/company/general-info/' + id);
  };

  useEffect(() => {
    fetchCompanies({});
  }, []);

  return (
    <div className="flex flex-col h-full justify-between w-full">
      <div className="grid grid-cols-4 gap-3">
        {data &&
          data.map((company: any) => {
            const isLiked = likedItems.includes(company.OrgId);

            return (
              <Card
                key={company.OrgId}
                className="rounded-5 shdow-theme-sm px-5 py-4 flex flex-col gap-2 bg-[#FFF5F0] dark:bg-info-1000"
              >
                <CardHeader className="flex justify-between border-b-1 border-neutral-100 dark:border-netuaral-700 pb-1">
                  <div className="flex items-center gap-2">
                    <img
                      alt={`${company.Name} Logo`}
                      className="rounded-2 w-[22px] h-[22px]"
                      src={company.GetLogoUrl}
                    />
                    <button onClick={() => handleOpenCompany(company.Name)}>
                      <span className="text-base font-semibold text-secondary-1000 leading-normal">
                        {company.GetIndustryName}
                      </span>
                    </button>
                  </div>
                  <div className="flex gap-1">
                    <AppButton
                      props={{
                        color: 'light',
                        size: 'md',
                        radius: 'md',
                        onPress: () => sendRequest(company.OrgId),
                        content: (
                          <>
                            <span className="text-secondary-1000">Easy Apply</span>
                            <DocumentForward className="text-secondary-1000" size="12" />
                          </>
                        ),
                      }}
                    />
                    <AppButton
                      props={{
                        color: 'light',
                        size: 'md',
                        radius: 'md',
                        onPress: () => toggleLike(company.OrgId),
                        content: (
                          <Heart
                            className={`transition-colors ${isLiked ? 'text-tertiar-400' : 'text-secondary-1000'}`}
                            size={14}
                            variant={isLiked ? 'Bold' : 'Outline'}
                          />
                        ),
                      }}
                    />
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="flex flex-col gap-4">
                    <span className="font-bold text-sm text-secondary-800">{company.Name}</span>
                    <div className="flex gap-4">
                      <Location className="text-secondary-1000" size="20" />
                      <span className="text-secondary-800 font-normal text-sm">{company.PlaceName}</span>
                    </div>
                    <div className="flex gap-4">
                      <Star1 className="text-warning-400" size="20" />
                      <span className="text-secondary-800 font-normal text-sm">{company.Rate} Score</span>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <AppButton
                      props={{
                        color: 'light',
                        size: 'md',
                        radius: 'md',
                        onPress: () => handleOpenCompany(company.OrgId),
                        content: (
                          <>
                            <span className="text-secondary-1000 text-xs font-normal">See More</span>
                            <ArrowRight size="12" />
                          </>
                        ),
                      }}
                    />
                  </div>
                </CardBody>
              </Card>
            );
          })}
      </div>
      <div className="flex justify-center">
        <AppPagination total={100} />
      </div>
    </div>
  );
};

export default Companies;
