
```js padded
import TeamAvatar from '../TeamAvatar';

const team = [
  {
    id: 1,
    name: "Jorge Watson",
    image:
      "https://vanhackblobstorageprod.blob.core.windows.net/publicfiles/profile1.png",
  },
  {
    id: 2,
    name: "Brooklyn Simmons",
    image:
      "https://vanhackblobstorageprod.blob.core.windows.net/publicfiles/profile2.png",
  },
  {
    id: 3,
    name: "Esther Howard",
    image:
      "https://vanhackblobstorageprod.blob.core.windows.net/publicfiles/profile3.png",
  },
];

<>
  <TeamAvatar team={team} displayTotal={2} />
</>;
```
