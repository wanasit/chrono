cat ./moment.js >> tmp
cat ./chrono.js >> tmp
cat ./parsers/ParseResult.js >> tmp
cat ./parsers/Parser.js >> tmp
cat ./parsers/IntegratedParser.js >> tmp
cat ./parsers/EN/* >> tmp
cat ./parsers/TH/* >> tmp
cat ./parsers/JP/* >> tmp

uglifyjs -o ./chrono.min.js < tmp
rm tmp