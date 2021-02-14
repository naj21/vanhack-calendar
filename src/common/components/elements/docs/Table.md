
```js padded
import Table from '../Table';
import Tag from '../Tag';
import Button from '../Button';
import { CandidateContainer } from '../../../../calendar/index.js';
import { calendar } from '../../../utils/mocks';
import themes from '../../../utils/themes';
import { mediaQueries } from "../../../utils/browser";
import { parseISO, format } from "date-fns";

const fields = [
      {
        name: "Candidate",
        render: (item) => {
          return (
            <CandidateContainer>
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
            </CandidateContainer>
          );
        },
      },
      {
        name: "Interview Step",
        key: "interviewStep",
      },
      {
        name: "Scheduled Time",
        render: (item) => {
          const waiting = item.status === "Waiting Confirmation";
          const date = parseISO(item.scheduledTime);

          return !waiting ? (
            <time dateTime={item.scheduledTime}>
              {format(date, "LLL, d . p")}
            </time>
          ) : (
            <Tag outline>Waiting Confirmation</Tag>
          );
        },
      },
      {
        displaySize: mediaQueries.large,
        render: (item) => {
          const waiting = item.status === "Waiting Confirmation";
          const scheduled = item.status === "Scheduled";
          const done = item.status === "Done";
          let text;

          if (scheduled) text = "Get interview link";
          if (done) text = "Move to the next step";

          return !waiting && <Button sm>{text}</Button>;
        },
      },
    ];

<div style={{ padding: "20px" }}>
  <Table
    elements={calendar}
    fields={fields}
    category={"status"}
    loading={false}
  />
</div>;
```
