import { Layout } from "antd";

const { Footer } = Layout;

const LayoutFooter: React.FC = () => {
    return <Footer
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
    }}
  >
    清岚问卷
  </Footer>
}

export default LayoutFooter;