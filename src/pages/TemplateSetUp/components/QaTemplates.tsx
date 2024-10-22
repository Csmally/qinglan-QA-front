import SingleTemplate from "./SingleTemplate";

const containerStyle: React.CSSProperties = {
  flex: 1,
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gridTemplateRows: "repeat(4, 1fr)",
  gap: "30px 30px",
};

const Data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const QaTemplates: React.FC = () => {
  return (
    <div style={containerStyle}>
      {Data.map((template) => (
        <SingleTemplate key={template} />
      ))}
    </div>
  );
};

export default QaTemplates;
