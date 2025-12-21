import {Elipse2} from "@hrbox/uikit/icons";
import {useTranslation} from "react-i18next";

const DashboardNotification = () => {
const { t } = useTranslation();

        return (
            <div className="bg-[#DCF0F9] dark:bg-[#04425C60] border border-primary rounded-xl p-4">
                    <div className="pb-2.5 border-b border-[#05587A]">
                            <p className="text-secondary-1000 font-sans text-2xl font-semibold">
                                    {t("Notifications")}
                            </p>
                    </div>
                    <div className="flex flex-col gap-3 pt-4">
                            <div className="flex items-center gap-2">
                                    <Elipse2 color=""  />
                                    <p className="text-secondary-1000 text-xl">
                                            Job (Product Manager) Unemployed
                                    </p>
                                    <button className="ml-auto bg-white rounded-lg dark:bg-info-1000 text-xs px-2 py-1 rounded">
                                            Basic Info →
                                    </button>
                            </div>
                            <div className="flex items-center gap-2">
                                    <Elipse2 color="#DDBA69" />
                                    <p className="text-secondary-1000 text-xl">
                                            Employed, (Ahmad Rezaei) above job grade
                                    </p>
                                    <button className="ml-auto text-xs bg-white rounded-lg px-2 py-1 rounded">
                                            Employees on This Job →
                                    </button>
                            </div>
                            <div className="flex items-center gap-2">
                                    <Elipse2 color="#F23030" />
                                    <p className="text-secondary-1000 text-xl">
                                            Employed (Ahmad Rezaei) below job rank
                                    </p>
                                    <button className="ml-auto text-xs bg-white rounded-lg px-2 py-1 rounded">
                                            Employees on This Job →
                                    </button>
                            </div>
                    </div>
            </div>

        )
}

export default DashboardNotification;