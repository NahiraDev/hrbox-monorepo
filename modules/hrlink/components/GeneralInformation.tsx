import { AppButton } from "@hrbox/uikit/components/AppButton";
import { Edit } from "iconsax-reactjs";
import { Avatar, Card } from "@heroui/react";
import { useAppSelector } from "@hrbox/core/redux";
import { InstagramIcon, LinkedinIcon, TelegramIcon } from "@hrbox/uikit/icons";
import { useFetchUserAboutMeQuery } from "@hrbox/modules/hrlink/apis";
import { GeneralInformationModal } from "../modals/GeneralInformationModal";

// Realistic mock data (only used when API returns nothing or invalid data)
const MOCK_DATA = {
  avatarUrl: "https://ui-avatars.com/api/?name=John+Doe&background=2563eb&color=fff&bold=true&size=128",
  company: "PO.Inc · Alabama Machinery & Supply",
  biography: "Experienced professional with a passion for innovation and leadership. Currently driving growth initiatives and building high-performing teams in the industrial sector.",
  telegram: "https://t.me/johndoe",
  linkedin: "https://linkedin.com/in/johndoe",
  instagram: "https://instagram.com/johndoe",
};

export const GeneralInformation = () => {
  const profileData: any = useAppSelector((state) => state.profile);
  const { data: aboutMe, isLoading, isError } = useFetchUserAboutMeQuery();

  // Determine final data to display (API → fallback to profile → mock)
  const displayData = aboutMe && !isError && Object.keys(aboutMe).length > 0
    ? aboutMe
    : MOCK_DATA;

  // Full name from profile (usually more reliable)
  const fullName = profileData?.profile?.name && profileData?.profile?.lastName
    ? `${profileData.profile.name} ${profileData.profile.lastName}`
    : "John Doe";

  const company = displayData.company || profileData?.profile?.company || MOCK_DATA.company;
  const biography = displayData.biography || profileData?.profile?.biography || MOCK_DATA.biography;

  return (
    <Card className="relative shadow-shadow-light-tight/1 rounded-xl p-4 h-3/5 bg-white">
      <div className="flex justify-between items-center border-b border-neutral-100 pb-2 mb-4">
        <div /> {/* Spacer if you want the edit button centered or right-aligned */}
        <AppButton
          content={<Edit className="text-secondary-1000" size="14" />}
          variant="light"
          isIconOnly
        />
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <div className="w-12" /> {/* Spacer for centering avatar */}

          <Avatar
            className="w-[70px] h-[70px] ring-4 ring-white shadow-lg"
            src={displayData.avatarUrl || MOCK_DATA.avatarUrl}
            alt="Profile"
            fallback="JD"
          />

          <div className="flex flex-col gap-2">
            {displayData.telegram && (
              <AppButton
                content={<TelegramIcon className="w-5 h-5" />}
                isIconOnly
                variant="light"
                onPress={() => window.open(displayData.telegram!, "_blank")}
              />
            )}
            {displayData.linkedin && (
              <AppButton
                content={<LinkedinIcon className="w-5 h-5" />}
                isIconOnly
                variant="light"
                onPress={() => window.open(displayData.linkedin!, "_blank")}
              />
            )}
            {displayData.instagram && (
              <AppButton
                content={<InstagramIcon className="w-5 h-5" />}
                isIconOnly
                variant="light"
                onPress={() => window.open(displayData.instagram!, "_blank")}
              />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 text-center">
          <div>
            <h2 className="text-secondary-900 dark:text-white font-bold text-lg">
              {fullName}
            </h2>
            <p className="text-xs font-medium text-secondary-600 dark:text-secondary-400 mt-1">
              {company}
            </p>
          </div>

          <div className="text-left">
            <h3 className="text-secondary-900 dark:text-white text-sm font-semibold mb-2">
              About Me
            </h3>
            <p className="text-xs font-light text-secondary-700 dark:text-secondary-300 leading-relaxed text-justify">
              {biography}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};