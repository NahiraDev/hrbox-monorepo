import { Link } from '@heroui/react';
import {
  Building,
  Buildings,
  CardAdd,
  CardTick,
  Heart,
  LampCharge,
  Link2,
  Medal,
  MedalStar,
  MoneyChange,
  People,
  Profile,
  TagUser,
} from 'iconsax-react';
import { useNavigate } from 'react-router-dom';
import { JobOffersIcon } from '../../icons';
import { AppButton } from 'core/components';
import { StarRating, Shared } from '../common';

const CompanyInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto w-full">
      <div className="flex flex-col justify-between gap-3.5 h-full">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <AppButton
              props={{
                color: 'secondary',
                size: 'md',
                radius: 'md',
                content: (
                  <>
                    <Buildings className="text-white" size="22" />
                    <span className="text-white text-xl font-normal">General Info</span>
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
                    <span className="text-secondary-400 text-xl font-normal">Offers</span>
                  </>
                ),
              }}
            />
            <AppButton
              props={{
                color: 'white',
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
          </div>
          <div className="flex gap-3">
            <Shared />
            <AppButton
              props={{
                color: 'white',
                size: 'md',
                radius: 'md',
                content: <span className="text-secondary-1000 text-xl">Complete the job form</span>
              }}
            />
            <AppButton
              props={{
                color: 'secondary',
                size: 'md',
                radius: 'md',
                content: (
                  <>
                    <Heart className="text-white" size="22" />
                    <span className="text-white text-xl">Favorites</span>
                  </>
                )
              }}
            />
          </div>
        </div>
        <div className="flex flex-col h-full justify-between">
          <div className="grid grid-cols-2 gap-3 h-full">
            <div className="bg-white rounded-[14px] shadow-shadow-light-tight/1 px-6 py-4">
              <div className="flex flex-col gap-[36px]">
                <div className="flex gap-6">
                  <img alt="" className="w-40 h-40 rounded-7 " src={""} />
                  <div className="flex flex-col gap-3">
                    <span className="font-semibold text-xl text-secondary-400 leading-normal">
                    </span>
                    <div className="flex gap-8">
                      <span className="text-secondary-400 font-semibold text-base">
                        Degital Solution
                      </span>
                      <span className="text-tertiar-400 font-normal text-base">12 Followers</span>
                    </div>
                    <StarRating rating={5} starColor="#FDD836" />
                    <Link className="flex gap-2.5" href="/">
                      <Link2 className="text-info" />
                      <span className="font-semibold text-base text-info">Degital Solution</span>
                    </Link>
                  </div>
                </div>
                <div>
                  <div className="flex gap-2 items-center">
                    <People className="text-secondary-400" size="22" />
                    <span className="text-xl font-normal text-secondary-400">About Us</span>
                  </div>
                  <p className="text-secondary-900 font-normal text-base leading-normal">
                    The Eurostar Group was established in 1995 in Spain, under the ownership and management of Mr. Ali
                    Nakoonam Sarouei. The company primarily focuses on building mass housing and developing residential
                    communities using innovative industrial methods. They specialize in a system known as modular
                    aluminum panels with in-situ concrete injection. Eurostar is the first manufacturer of modular
                    aluminum panels in Spain, with all panels produced in their own factories. The company employs
                    skilled professionals throughout the design and execution phases. A significant achievement for
                    Eurostar is the implementation of cutting-edge technology in Iran, creating debris-free structures.
                    The company aims to expand its industrial and reliable construction solutions in earthquake-prone
                    countries, promoting sustainable development and job creation.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-[14px] shadow-shadow-light-tight/1 px-6 py-4">
              <div className="flex flex-col gap-6">
                <div className="border-b-1 border-neutral-100 dark:border-neutral-700">
                  <div className="flex gap-7">
                    <img alt="OurMissions" className="w-[272px] h-[272px]" src={""} />
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <MedalStar size="22" />
                        <span className="text-secondary-400 text-xl">Our Misions</span>
                      </div>
                      <p className="text-base text-secondary-900">
                        By promoting the use of small units and collaborating with banks, applicants can acquire housing
                        without any initial investment, relying solely on bank financing. If we can effectively
                        communicate the costs of maintenance and energy savings to citizens, they will be encouraged to
                        settle for smaller units.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <span className="text-secondary-900 font-semibold text-xl leading-normal">Detailed Information</span>
                  <div className="flex flex-col gap-3">
                    <div className="p-4 rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-gradient-to-r from-[#FBF1EF] via-[#FCF8F8] via-50% via-[#F9F0F0] to-[#FCF4F3] backdrop-blur-[4px] flex justify-between dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                      <div className="flex items-center gap-1.5">
                        <Building className="text-[#292D32]" size="16" />
                        <span className="text-secondary-900 text-base font-light leading-normal">
                          Establishment
                        </span>
                      </div>
                      <span className="text-secondary-900 text-base font-semibold leading-normal">
                        1400
                      </span>
                    </div>
                    <div className="p-4 rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-gradient-to-r from-[#FBF1EF] via-[#FCF8F8] via-50% via-[#F9F0F0] to-[#FCF4F3] backdrop-blur-[4px] flex justify-between dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                      <div className="flex items-center gap-1.5">
                        <Profile className="text-[#292D32]" size="16" />
                        <span className="text-secondary-900 text-base font-light leading-normal">
                          No. Employees
                        </span>
                      </div>
                      <span className="text-secondary-900 text-base font-semibold leading-normal">
                        120
                      </span>
                    </div>
                    <div className="p-4 rounded-[8px] border border-[rgba(220,240,249,0.40)] bg-gradient-to-r from-[#FBF1EF] via-[#FCF8F8] via-50% via-[#F9F0F0] to-[#FCF4F3] backdrop-blur-[4px] flex justify-between dark:border-[rgba(4,66,92,0.40)] dark:bg-[linear-gradient(90deg,_#080E1C_0%,_#111D38_50%,_#080E1C_100%)]">
                      <div className="flex items-center gap-1.5">
                        <LampCharge className="text-[#292D32]" size="16" />
                        <span className="text-secondary-900 text-base font-light leading-normal">
                          Advantages
                        </span>
                      </div>
                      <div className="flex gap-3">
                        <div className="flex items-center gap-1">
                          <TagUser size="16" />
                          <span className="text-secondary-900 text-base font-semibold leading-normal">
                            Insurance
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CardAdd size="16" />
                          <span className="text-secondary-900 text-base font-semibold leading-normal">
                            Loan
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MoneyChange size="16" />
                          <span className="text-secondary-900 text-base font-semibold leading-normal">
                            Gym facilities
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CardTick size="16" />
                          <span className="text-secondary-900 text-base font-semibold leading-normal">
                            Training programs
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
