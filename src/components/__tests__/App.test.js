import sum from "../sum";
// react单元测试库，至于怎么用请去官网或者github上看，
// 有案例的github:【https://github.com/airbnb/enzyme】
import { shallow } from "enzyme";
import App from "../App";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});
