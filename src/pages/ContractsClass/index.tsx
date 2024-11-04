import { memo, useEffect } from "react";
import { useParams } from "react-router-dom";

const ContractsClassPage: React.FC = () => {
  const { id } = useParams();
  useEffect(() => {
    console.log("9898id-bb", id);
  }, [id]);
  return <div>我身上时</div>;
};

export default memo(ContractsClassPage);
