import QaTemplates from "./components/QaTemplates";

const containerStyle: React.CSSProperties = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
};

const TemplateSetUpPage: React.FC = () => {
  return (
    <div style={containerStyle}>
      <QaTemplates />
      <div>footer</div>
    </div>
  );
};

export default TemplateSetUpPage;
