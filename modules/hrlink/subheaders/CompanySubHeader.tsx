import { AppButton, AppSearchInput } from "@hrbox/uikit/components";
import { Buildings, DeviceMessage, Heart, Setting4 } from "iconsax-reactjs";
import { useNavigation } from "@hrbox-monorepo/core/hooks/useNavigation";
import { Paths } from "@hrbox-monorepo/modules/paths";

export const CompanySubHeader = (props: any) => {
  const navigate = useNavigation();

  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <AppButton
          props={{
            color: "white",
            size: "md",
            radius: "md",
            // onPress: () => navigate(HRLinkPaths.AllCompanies),
            content: (
              <>
                <Buildings className="text-secondary-400" size="22" />
                <span className="text-secondary-400 text-xl">
                  All Companies
                </span>
              </>
            ),
          }}
        />
        <AppButton
          props={{
            color: "secondary",
            size: "md",
            radius: "md",
            // onPress: () => navigate(HRLinkPaths.CompanyRequested),
            content: (
              <>
                <DeviceMessage className="text-white" size="22" />
                <span className="text-white text-xl">Requested</span>
              </>
            ),
          }}
        />
        <AppButton
          props={{
            color: "secondary",
            size: "md",
            radius: "md",
            onPress: () => navigate.push({ to: Paths.HRLink.CompanyFavorites }),
            content: (
              <>
                <Heart className="text-secondary-400" size="22" />
                <span className="text-secondary-400 text-xl">Followed</span>
              </>
            ),
          }}
        />
      </div>
      <div className="flex gap-3">
        <AppSearchInput onSearch={props.onSearch} />
        <AppButton
          props={{
            color: "white",
            size: "md",
            radius: "md",
            isIconOnly: true,
            content: <Setting4 className="text-secondary-1000" />,
          }}
        />
      </div>
    </div>
  );
};
