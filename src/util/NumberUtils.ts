/**
 * This class contains some utility functions for numbers.
 *
 * @module Temple
 * @namespace temple.utils.types
 * @class NumberUtils
 * @author Thijs Broerse, Arjan van Wijk, Bart van der Schoor
 */
class NumberUtils
{
	/**
	 * Creates a random number within a given range.
	 *
	 * @method randomInRange
	 * @static
	 * @param {number} start Lowest number of the range.
	 * @param {number} end Highest number of the range.
	 * @return {number} A new random number within the range.
	 * @example
	 * This example creates a random number between 10 and 20:
	 * ```
	 * var scale:number = NumberUtils.randomInRange(10, 20);
	 * ```
	 */
	public static randomInRange(start:number, end:number):number
	{
		var d:number = end - start;
		return start + (d - Math.random() * d);
	}

	/**
	 * Finds the relative position of a number in a range between min and max, and returns its normalized value between 0 and 1.
	 *
	 * @method normalizedValue
	 * @static
	 * @param {number} value The value to normalize.
	 * @param {number} min Lowest range value.
	 * @param {number} max Highest range value.
	 * @return {number} The normalized value between 0 and 1.
	 * @example
	 * ```
	 * NumberUtils.normalizedValue(25, 0, 100); // 0.25
	 * NumberUtils.normalizedValue(0, -1, 1); // 0.5
	 * ```
	 */
	public static normalizedValue(value:number, min:number, max:number):number
	{
		var diff:number = max - min;
		if(diff == 0)
		{
			return min;
		}
		var f:number = 1 / diff;
		return f * (value - min);
	}

	/**
	 * Calculates the angle of a vector.
	 *
	 * @method angle
	 * @static
	 * @param {number} dx The x component of the vector.
	 * @param {number} dy The y component of the vector.
	 * @return {number} The the angle of the passed vector in degrees.
	 */
	public static angle(dx:number, dy:number):number
	{
		return Math.atan2(dy, dx) * 180 / Math.PI;
	}

	/**
	 * Determines a value between two specified values.
	 *
	 * @method interpolate
	 * @static
	 * @param {number} factor The level of interpolation between the two values.
	 * @param {number} minimum The lower value.
	 * @param {number} maximum The upper value.
	 * @example
	 * ```
	 * NumberUtil.interpolate(0.5, 0, 10); //5
	 * ```
	 */
	public static interpolate(factor:number, minimum:number, maximum:number):number
	{
		return minimum + (maximum - minimum) * factor;
	}

	/**
	 * Formats a number to a specific format.
	 *
	 * @method format
	 * @static
	 * @param {number} value The number to format.
	 * @param {string} [decimalDelimiter=','] The characters used to delimit the fractional portion from the whole number.
	 * @param {string} [thousandDelimiter='.'] The characters used to delimit thousands, millions, etcetera.
	 * @param {number} [precision=NaN] The total number of decimals.
	 * @param {number} [fillLength=NaN]  The minimal length of the part *before* the decimals delimiter, if the length is less, it will be filled up.
	 * @param {string} [fillChar='0'] The character to use to fill with.
	 */
	public static format(value:number,
	                     decimalDelimiter:string = ',',
	                     thousandDelimiter:string = '.',
	                     precision:number = NaN,
	                     fillLength:number = NaN,
	                     fillChar:string = '0'):string
	{
		if(!isNaN(precision))
		{
			value = NumberUtils.roundToPrecision(value, precision);
		}

		var str:string = value.toString();
		var p:number = str.indexOf('.');
		if(value < 0)
		{
			str = str.substr(1);
		}

		var decimals:string = p != -1 ? str.substr(p + 1) : '';
		while(decimals.length < precision)
		{
			decimals = decimals + '0';
		}

		var floored:string = Math.floor(Math.abs(value)).toString();
		var formatted:string = '';

		if(thousandDelimiter)
		{
			var len:number = Math.ceil(floored.length / 3) - 1;
			for(var i:number = 0; i < len; ++i)
			{
				formatted = thousandDelimiter + floored.substr(floored.length - (3 * (i + 1)), 3) + formatted;
			}
			formatted = floored.substr(0, floored.length - (3 * i)) + formatted;
		}
		else
		{
			formatted = floored;
		}

		if(fillLength && fillChar && fillChar != '')
		{
			if(value < 0)
			{
				fillLength--;
			}
			while(formatted.length < fillLength)
			{
				formatted = fillChar + formatted;
			}
		}

		if(isNaN(precision) || precision > 0)
		{
			formatted = formatted + (decimals ? decimalDelimiter + decimals : '');
		}

		if(value < 0)
		{
			formatted = '-' + formatted;
		}

		return formatted;
	}

	/**
	 * Rounds a number to a certain level of precision. Useful for limiting the number of decimal places on a fractional number.
	 *
	 * @method roundToPrecision
	 * @static
	 * @param {number} value The input number to round.
	 * @param {number} [precision=0] The number of decimal digits to keep.
	 * @return {number} The rounded number, or the original input if no rounding is needed.
	 */
	public static roundToPrecision(value:number, precision:number = 0):number
	{
		var n:number = Math.pow(10, precision);
		return Math.round(value * n) / n;
	}

	/**
	 * Floors a number to a certain level of precision. Useful for limiting the number of
	 * decimal places on a fractional number.
	 *
	 * @method floorToPrecision
	 * @static
	 * @param {number} value The input number to round.
	 * @param {number} [precision=0] The number of decimal digits to keep.
	 * @return {number} The floored number, or the original input if no flooring is needed.
	 */
	public static floorToPrecision(value:number, precision:number = 0):number
	{
		var n:number = Math.pow(10, precision);
		return Math.floor(value * n) / n;
	}

	/**
	 * Ceils a number to a certain level of precision. Useful for limiting the number of
	 * decimal places on a fractional number.
	 *
	 * @method ceilToPrecision
	 * @static
	 * @param {number} value The input number to ceil.
	 * @param {number} precision The number of decimal digits to keep.
	 * @return {number} The ceiled number, or the original input if no ceiling is needed.
	 */
	public static ceilToPrecision(value:number, precision:number = 0):number
	{
		var n:number = Math.pow(10, precision);
		return Math.ceil(value * n) / n;
	}

	/**
	 * Rounds a Number to the nearest multiple of an input. For example, by rounding
	 * 16 to the nearest 10, you will receive 20. Similar to the built-in function Math.round().
	 *
	 * @method roundToNearest
	 * @static
	 * @param {number} value The number to round.
	 * @param {number} [nearest=1] the number whose multiple must be found.
	 * @return {number} The rounded number.
	 */
	public static roundToNearest(value:number, nearest:number = 1):number
	{
		if(nearest == 0)
		{
			return value;
		}
		var roundedNumber:number = Math.round(NumberUtils.roundToPrecision(value / nearest, 10)) * nearest;
		return NumberUtils.roundToPrecision(roundedNumber, 10);
	}

	/**
	 * Rounds a Number down to the nearest multiple of an input. For example, by rounding
	 * 16 up to the nearest 10, you will receive 10. Similar to the built-in function Math.floor().
	 *
	 * @method floorToNearest
	 * @static
	 * @param {number} value The number to round down.
	 * @param {number} [nearest=1] the number whose multiple must be found.
	 * @return {number} The rounded number.
	 */
	public static floorToNearest(value:number, nearest:number = 1):number
	{
		if(nearest == 0)
		{
			return value;
		}
		return Math.floor(NumberUtils.roundToPrecision(value / nearest, 10)) * nearest;
	}

	/**
	 * Rounds a Number up to the nearest multiple of an input. For example, by rounding
	 * 16 up to the nearest 10, you will receive 20. Similar to the built-in function Math.ceil().
	 *
	 * @method ceilToNearest
	 * @static
	 * @param {number} value The number to round down.
	 * @param {number} [nearest=1] the number whose multiple must be found.
	 * @return {number} The rounded number.
	 */
	public static ceilToNearest(value:number, nearest:number = 1):number
	{
		if(nearest == 0)
		{
			return value;
		}
		return Math.ceil(NumberUtils.roundToPrecision(value / nearest, 10)) * nearest;
	}

	/**
	 * Tests equality for numbers that may have been generated by faulty floating point math.
	 * This is not an issue exclusive to the browser, but all modern computing in general.
	 * The value is generally offset by an insignificant fraction, and it may be corrected.
	 *
	 * Alternatively, this function could be used for other purposes than to correct floating
	 * point errors. Certainly, it could determine if two very large numbers are within a certain
	 * range of difference. This might be useful for determining "ballpark" estimates or similar
	 * statistical analysis that may not need complete accuracy.
	 *
	 * @method fuzzyEquals
	 * @static
	 * @param {number} value1 The first number to test.
	 * @param {number} value2 The second number to test.
	 * @param {number} [precision=5] The number of digits in the fractional portion to keep.
	 * @return {boolean} Whether the numbers are close enough to be considered equal.
	 */
	public static fuzzyEquals(value1:number, value2:number, precision:number = 5):boolean
	{
		var difference:number = value1 - value2;
		var range:number = Math.pow(10, -precision);

		//default precision checks the following:
		//0.00001 < difference > -0.00001

		return difference < range && difference > -range;
	}

	/**
	 * Clamp a number to a range around zero (from -range to +range).
	 *
	 * @method clampPosNeg
	 * @static
	 * @param {number} input The number to clamp.
	 * @param {number} range The range to clamp to.
	 * @param {number} [base=0] The base value.
	 * @return {boolean} The clamped value.
	 */
	public static clampPosNeg(input:number, range:number, base:number = 0):number
	{
		range = Math.abs(range);

		input -= base;

		if(input < 0 && input < -range)
		{
			return base - range;
		}
		else if(input > 0 && input > range)
		{
			return base + range;
		}
		return base + input;
	}

	/**
	 * Get the Number out of a string. Can handle . or , as decimal separator (will not match thousand delimitters).
	 * Useful for unit values like '€ 49.95' or '1000 KM'
	 *
	 * @method getNumberFromString
	 * @static
	 * @param {string} value The input value.
	 * @return {number} The number from the string.
	 */
	public static getNumberFromString(value:string):number
	{
		let negative = value.substr(0, 1) == '-';
		value = value.match(/[0-9]+[.,]?[0-9]*/)[0];
		// replace , fo .
		value = value.replace(',', '.');
		return negative ? -parseFloat(value) : parseFloat(value);
	}


	/**
	 * Get English suffix for an ordinal number: 1 -> 'st' ('1st'), 2 -> 'nd' ('2nd'), 3 -> 'rd' ('3rd'), 4 -> 'th' ('4th').
	 *
	 * @method ordinalSuffix
	 * @static
	 * @param {number} position The input value.
	 * @return {string} The input value with the ordinal suffix.
	 */
	public static ordinalSuffix(position:number):string
	{
		if(position < 0)
		{
			throw 'ordinal number less then zero';
		}

		//exceptions
		switch(position)
		{
			case 0:
				return 'th';
			case 11:
			case 12:
			case 13:
				return 'th';
		}
		//rule
		var rest:number = position % 10;
		switch(rest)
		{
			case 1:
				return 'st';
			case 2:
				return 'nd';
			case 3:
				return 'rd';
		}
		return 'th';
	}

	/**
	 * Calculates the smallest possible difference between 2 indexes.
	 *
	 * @method getNearestRotationIndex
	 * @static
	 * @param {number} index The current index.
	 * @param {number} newIndex The new index.
	 * @param {number} [total=360] The range to do 'modulo'.
	 * @return {number}
	 */
	public static getNearestRotationIndex(index:number, newIndex:number, total:number = 360):number
	{
		var curIndex:number = index;
		while(curIndex < 0)
		{
			curIndex += total;
		}
		while(newIndex < 0)
		{
			newIndex += total;
		}

		var diff:number = Math.abs(curIndex - newIndex);

		if(diff > total / 2)
		{
			if(curIndex > newIndex)
			{
				return index + (total - diff);
			}
			else
			{
				return index - (total - diff);
			}
		}
		else
		{
			if(curIndex < newIndex)
			{
				return index + diff;
			}
			else
			{
				return index - diff;
			}
		}
	}
}

export default NumberUtils;
