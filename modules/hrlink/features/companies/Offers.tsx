import { Buildings2, Clock, DollarCircle, Heart, HomeHashtag, Location, Medal, Status } from 'iconsax-react';
import { Button } from '@heroui/button';
import { AppButton, AppPagination } from 'core/components';
import { Card, CardBody, CardHeader } from '@heroui/react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { JobOffersIcon } from '../../icons';
import { Shared, StarRating } from '../common';

import { useLazyFetchCompanyQuery } from './apis';

const Offers = () => {
  const [fetchCompanies, { data }] = useLazyFetchCompanyQuery();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCompanies({});
  }, []);

  return (
    <div className="flex flex-col justify-between gap-3.5 h-full">
      <div className="flex justify-between ">
        <div className="flex gap-2">
          <AppButton
            props={{
              color: 'white',
              size: 'md',
              radius: 'md',
              content: (
                <>
                  <HomeHashtag className="text-secondary-400" size="22" />
                  <span className="text-secondary-400 text-xl font-normal">General Info’s</span>
                </>
              ),
            }}
          />
          <AppButton
            props={{
              color: 'white',
              size: 'md',
              radius: 'md',
              onPress: () => navigate('/company/job-offers'),
              content: (
                <>
                  <JobOffersIcon color="#fff" />
                  <span className="text-white text-xl font-norma">Job Offers</span>
                </>
              ),
            }}
          />
          <AppButton
            props={{
              color: 'light',
              size: 'md',
              radius: 'md',
              onPress: () => navigate('/company/events'),
              content: (
                <>
                  <Medal className="text-secondary-400" size="22" />
                  <span className="text-secondary-400 text-xl font-normal">Events</span>
                </>
              ),
            }}
          />
          <AppButton
            props={{
              color: 'light',
              size: 'md',
              radius: 'md',
              onPress: () => navigate('/company/favorites'),
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
          <Button className="!rounded-md !px-3 !py-1.5 w-fit !bg-white">
            <span className="text-secondary-1000 text-xl font-normal">Complete the job form</span>
          </Button>
          <Button className="flex items-center gap-2 !rounded-md bg-white shadow-shadow-light-tight/1 !px-3 !py-1.5 w-fit">
            <Heart className="text-secondary-1000" size="22" />
            <span className="text-secondary-1000 text-xl font-normal">Favorites</span>
          </Button>
          <Shared />
        </div>
      </div>
      <div className="flex flex-col h-full justify-between">
        <div className="grid grid-cols-3 gap-3">
          {data &&
            data.map((offer: any) => (
              <Card key={offer.id} className="rounded-5 bg-white shadow-shadow-light-tight/1 px-3 py-4">
                <CardHeader className="flex justify-between pb-1 border-b-1 border-neutral-100 dark:border-neutral-700">
                  <div className="flex items-center gap-2">
                    <Buildings2 className="text-secondary-400" size="22" />
                    <span className="text-secondary-1000 font-semibold">{offer.company}</span>
                  </div>
                </CardHeader>
                <CardBody className="flex justify-between pt-2">
                  <div className="flex flex-col gap-1">
                    <span className="text-secondary-800 font-bold text-sm leading-normal">{offer.title}</span>
                    <div className="flex items-center gap-2">
                      <Location className="text-secondary-1000" size="16" />
                      <span className="text-secondary-1000 dark:text-white text-sm font-normal">{offer.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="text-secondary-1000" size="16" />
                      <span className="text-secondary-1000 text-sm font-normal">{offer.type}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarCircle className="text-secondary-1000" size="16" />
                      <span className="text-secondary-1000 text-sm font-normal">{offer.salary}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Status className="text-info" size="20" variant="Bold" />
                      <span className="text-info-700 text-sm font-normal">{offer.status}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <StarRating rating={offer.rating} starColor="#FDD836" />
                    <div className="flex justify-end">
                      <img alt="" className="w-[84px] h-[84px] rounded-5" src={''} />
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
        </div>
        <div className="flex justify-center">
          <AppPagination total={100} />
        </div>
      </div>
    </div>
  );
};

export default Offers;
