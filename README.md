Consol application reads arbitrary line from large text files (.txt) and print the output.

## How application works

1. Application accepts two arguments (*path to the Text file*, *line number*)
2. First, application reads whole file using streams and index the whole file into custom Index structure
3. Custom indexes help later with the read operation
3. Second, application uses indexes to read specifyc bytes of the file to retrieve arbitrary line
4. Arbitrary line is printed

Note:
 - For reseting indexes file, delete indexes.json file from the project
 - Application was developed on Node.js 22
 - Application has been tested with macimum 50 000 000 line file (size 15GB)

## How to run

1. Run

```
npm install
```

2. Run

```
npm run exec -- -p {PATH_TO_THE_FILE} -i {LINE_NUMBER}
```

OR

```
npm run exec -- --path {PATH_TO_THE_FILE} --index {LINE_NUMBER}
```

## Examples

*Command*:

```
npm run exec -- --path ./data/billionLines.txt -i 50000000
```

*Output (1. Run):*

```
Index # 215  created
Index # 216  created
Index # 217  created
Index # 218  created
Index # 219  created
Index # 220  created
Index # 221  created
Index # 222  created
Reading line ...
Arbitrary Line:  0f1]2C3e4Y5@6+7*8_9K10`11R12G13614P15516~17f18619A20D21#22c23?24.25o26X27q28y29{30131[32E33J34j35c36R37i38z39d40Y41v42543X44g45S46/47t48d49h50?51X52953g54f55K56E57k58.59C60361$62?63S64[65$66a67u68X69Z70871(72U73i74&75#76~77+78d79)80a81K82183e84V85t86087%88`89m90+91/92]93C94v95S96!97:98!99;
```

*Output (X. Run):*

```
Indexing file ...
File has been already indexed. See indexes.json file
Reading line ...
Arbitrary Line:  0f1]2C3e4Y5@6+7*8_9K10`11R12G13614P15516~17f18619A20D21#22c23?24.25o26X27q28y29{30131[32E33J34j35c36R37i38z39d40Y41v42543X44g45S46/47t48d49h50?51X52953g54f55K56E57k58.59C60361$62?63S64[65$66a67u68X69Z70871(72U73i74&75#76~77+78d79)80a81K82183e84V85t86087%88`89m90+91/92]93C94v95S96!97:98!99;
```

Consol application reads arbitrary line from large text files and print the output.

## How application works

1. Application accepts two arguments (*path to the Text file*, *line number*)
2. First, application reads whole file using streams and index the whole file into custom Index structure
3. Custom indexes help later with the read operation
3. Second, application uses indexes to read specifyc bytes of the file to retrieve arbitrary line
4. Arbitrary line is printed

## How to run

1. Run

```
npm install
```

2. Run

```
npm run exec -- -p {PATH_TO_THE_FILE} -i {LINE_NUMBER}
```

OR

```
npm run exec -- --path {PATH_TO_THE_FILE} --index {LINE_NUMBER}
```

## Examples

*Command*:

```
npm run exec -- --path ./data/billionLines.txt -i 50000000
```

*Output (1. Run):*

```
Index # 215  created
Index # 216  created
Index # 217  created
Index # 218  created
Index # 219  created
Index # 220  created
Index # 221  created
Index # 222  created
Reading line ...
Arbitrary Line:  0f1]2C3e4Y5@6+7*8_9K10`11R12G13614P15516~17f18619A20D21#22c23?24.25o26X27q28y29{30131[32E33J34j35c36R37i38z39d40Y41v42543X44g45S46/47t48d49h50?51X52953g54f55K56E57k58.59C60361$62?63S64[65$66a67u68X69Z70871(72U73i74&75#76~77+78d79)80a81K82183e84V85t86087%88`89m90+91/92]93C94v95S96!97:98!99;
```

*Output (X. Run):*

```
Indexing file ...
File has been already indexed. See indexes.json file
Reading line ...
Arbitrary Line:  0f1]2C3e4Y5@6+7*8_9K10`11R12G13614P15516~17f18619A20D21#22c23?24.25o26X27q28y29{30131[32E33J34j35c36R37i38z39d40Y41v42543X44g45S46/47t48d49h50?51X52953g54f55K56E57k58.59C60361$62?63S64[65$66a67u68X69Z70871(72U73i74&75#76~77+78d79)80a81K82183e84V85t86087%88`89m90+91/92]93C94v95S96!97:98!99;
```