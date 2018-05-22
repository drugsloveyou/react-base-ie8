import sum from "../sum";
// react单元测试库，至于怎么用请去官网或者github上看，
// 有案例的github:【https://github.com/airbnb/enzyme】
import React from "react";
import ReactDOM from "react-dom";
import App from "../App";

//设置Enzyme适配器，不同版本的react不同的适配器哦~，
// 【react的0.14.x】=> http://airbnb.io/enzyme/docs/installation/react-014.html
// 【Enzyme文档】=> http://airbnb.io/enzyme/docs
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-14";
Enzyme.configure({ adapter: new Adapter() });

const setup = () => {
  // 模拟 props
  const props = {
    // Jest 提供的mock 函数
    onAddClick: jest.fn()
  };

  // 通过 enzyme 提供的 shallow(浅渲染) 创建组件
  const wrapper = shallow(<App {...props} />);
  return {
    props,
    wrapper
  };
};

describe("App test", () => {
  const { wrapper, props } = setup();

  // case1
  it("adds 1 + 2 to equal 3", () => {
    expect(sum(1, 2)).toBe(3);
  });

  // 通过查找存在 Input,测试组件正常渲染
  it("AddTodoView Component should be render", () => {
    //.find(selector) 是 Enzyme shallow Rendering 提供的语法, 用于查找节点
    // 详细用法见 Enzyme 文档 http://airbnb.io/enzyme/docs/api/shallow.html
    expect(wrapper.find("input").exists());
  });
});
