```js
import Dropdown, { Option } from "../Dropdown";
import ElipsisIcon from "../../../../assets/v-elipsis.svg";
import InfoIcon from "../../../../assets/info.svg";
import CompanyIcon from "../../../../assets/company.svg";
import UserIcon from "../../../../assets/user-circle.svg";
import DollarIcon from "../../../../assets/dollar.svg";
import PinIcon from "../../../../assets/pin.svg";

<div style={{ display: "flex", justifyContent: "space-evenly" }}>
  <Dropdown icon={InfoIcon}>
    <Option>
      <img src={CompanyIcon} alt="company" />
      <span>Driftwood sidecorp</span>
    </Option>
    <Option>
      <img src={UserIcon} alt="user" />
      <span> 1 Position </span>
    </Option>
    <Option>
      <img src={DollarIcon} alt="company" />
      <span>$CAD 100 - 140k</span>
    </Option>
    <Option>
      <img src={PinIcon} alt="company" />
      <span>Remote</span>
    </Option>
  </Dropdown>

  <Dropdown icon={ElipsisIcon} sm>
    <Option>Cancel request</Option>
    <Option>Set as Interview done</Option>
    <Option>View calendar</Option>
    <Option>Report a problem</Option>
  </Dropdown>
</div>;
```
