import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import GlobalLeafletMap from "../../components/LeafletMaps/GlobalLeafletMap";

const OperatorMap = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="w-full h-full">
      <GlobalLeafletMap role={user?.role} />
    </div>
  );
};
export default OperatorMap;
