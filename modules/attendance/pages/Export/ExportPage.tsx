import { useTranslation } from "react-i18next";

const ExportPage =()=>{
  const {t}=useTranslation();
  return(
  <>
    <div className="w-full h-full! flex items-center justify-center ">
      <div className="flex flex-col items-center font-semibold text-2xl ">
        <p className="font-semibold! text-2xl!">{t("there_is_no_data_to_show")}</p>
        <img src="/public/images/nothing-found-mP9ZWosWHo.webp"/>
      </div>
    </div>
  </>
  )
}
export default ExportPage;
