const dayjs = require('dayjs');
var Parser = require('../parser').Parser;
var ParsedResult = require('../../result').ParsedResult;

/*
  Valid patterns:
  - esta manhã -> today in the morning
  - esta tarde -> today in the afternoon/evening
  - esta noite -> tonight
  - ontem de -> yesterday in the morning
  - ontem a tarde -> yesterday in the afternoon/evening
  - ontem a noite -> yesterday at night
  - amanhã de manhã -> tomorrow in the morning
  - amanhã a tarde -> tomorrow in the afternoon/evening
  - amanhã a noite -> tomorrow at night
  - hoje -> today
  - ontem -> yesterday
  - amanhã -> tomorrow
 */
var PATTERN = /(\W|^)(agora|esta\s*(manhã|tarde|noite)|(ontem|amanhã)\s*(de|à)\s*(manhã|tarde|noite)|hoje|amanhã|ontem|noite)(?=\W|$)/i;

exports.Parser = function PTCasualDateParser(){

    Parser.apply(this, arguments);

    this.pattern = function() { return PATTERN; }

    this.extract = function(text, ref, match, opt){

        var text = match[0].substr(match[1].length);
        var index = match.index + match[1].length;
        var result = new ParsedResult({
            index: index,
            text: text,
            ref: ref,
        });

        var refMoment = dayjs(ref);
        var startMoment = refMoment;
        var lowerText = text.toLowerCase().replace(/\s+/g, ' ');

        if(lowerText == 'amanhã'){

            // Check not "Tomorrow" on late night
            if(refMoment.hour() > 1) {
                startMoment = startMoment.add(1, 'day');
            }

        } else if(lowerText == 'ontem') {

            startMoment = startMoment.add(-1, 'day');
        }
        else if(lowerText == 'noite') {

            result.start.imply('hour', 0);
            if (refMoment.hour() > 6) {
                startMoment = startMoment.add(-1, 'day');
            }

        } else if (lowerText.match("esta")) {

            var secondMatch = match[3].toLowerCase();
            if (secondMatch == "tarde") {

                result.start.imply('hour', 18);

            } else if (secondMatch == "manhã") {

                result.start.imply('hour', 6);

            } else if (secondMatch == "noite") {

              // Normally means this coming midnight
              result.start.imply('hour', 22);
              result.start.imply('meridiem', 1);

            }
        } else if (lowerText.match(/de|à/)) {

            var firstMatch = match[4].toLowerCase();
            if (firstMatch === 'ontem') {

                startMoment = startMoment.add(-1, 'day');

            } else if (firstMatch === 'amanhã') {

                startMoment = startMoment.add(1, 'day');

            }

            var secondMatch = match[6].toLowerCase();
            if (secondMatch == "tarde") {

                result.start.imply('hour', 18);

            } else if (secondMatch == "manhã") {

                result.start.imply('hour', 9);

            } else if (secondMatch == "noite") {

              // Normally means this coming midnight
              result.start.imply('hour', 22);
              result.start.imply('meridiem', 1);

            }

        } else if (lowerText.match("agora")) {

          result.start.imply('hour', refMoment.hour());
          result.start.imply('minute', refMoment.minute());
          result.start.imply('second', refMoment.second());
          result.start.imply('millisecond', refMoment.millisecond());

        }

        result.start.assign('day', startMoment.date())
        result.start.assign('month', startMoment.month() + 1)
        result.start.assign('year', startMoment.year())
        result.tags['PTCasualDateParser'] = true;
        return result;
    }
}
