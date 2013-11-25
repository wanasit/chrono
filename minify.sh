echo '(function(){' > tmp
cat ./moment.js >> tmp
cat ./chrono.js >> tmp
cat ./timezone.js >> tmp
cat ./parsers/ParseResult.js >> tmp
cat ./parsers/Parser.js >> tmp
cat ./parsers/IntegratedParsing.js >> tmp
cat ./parsers/DE/* >> tmp
cat ./parsers/EN/* >> tmp
cat ./parsers/TH/* >> tmp
cat ./parsers/JP/* >> tmp
cat ./refiners/IntegratedRefinement.js >> tmp
cat ./refiners/ALL/* >> tmp
echo '})()' >> tmp

uglifyjs -o ./chrono.min.js < tmp
rm tmp