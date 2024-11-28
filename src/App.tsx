import { Tab, Tabs } from "./components/base/Tabs";
import { ToastProvider } from "./components/base/Toast";
import { ComponentDemo } from "./demos/ComponentDemo";
import { FormDemo } from "./demos/FormDemo";

const tabs: Tab[] = [
  {
    id: "components",
    label: "Components Demo",
    content: <ComponentDemo />,
  },
  {
    id: "form",
    label: "Form Demo",
    content: <FormDemo />,
  },
  {
    id: "dummy",
    label: "Dummy",
    content: <h1>hello</h1>,
  },
];

function App() {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <Tabs tabs={tabs} />
        </div>
      </div>
    </ToastProvider>
  );
}

export default App;
