import { validateType } from 'vue-types/es/utils';

/**
 * Transforms the given typechecker from `vue-types` to allow for a `null` value.
 * Note: to make the vue-type required, add the `.isRequired` to the `typechecker`
 * passed to this util.
 *
 * @example {
 *   options: nullableVueType(VueTypes.arrayOf(VueTypes.string).isRequired),
 *   value: nullableVueType(VueTypes.string),
 * }
 * @param typechecker The typechecker from the `vue-types` package
 * @returns a typechecker that allows the `null` value
 */
const nullableVueType = typechecker => ({
  validator: value => {
    if (value === null) {
      return true;
    }

    if (typeof value === 'undefined') {
      return !typechecker.required;
    }

    return validateType(typechecker, value);
  },
});

export default nullableVueType;
