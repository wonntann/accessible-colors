import { MIN_FONT_SIZE } from 'constants';
import colorUtils from 'utils/color/color';
import numberUtils from 'utils/number/number';
import { UPDATE_TEXT_COLOR, CORRECT_TEXT_COLOR,
         UPDATE_FONT_SIZE, CORRECT_FONT_SIZE,
         TOGGLE_FONT_WEIGHT,
         UPDATE_BACKGROUND_COLOR, CORRECT_BACKGROUND_COLOR,
         UPDATE_ACCESSIBILITY_LEVEL } from 'actions/app';
import { UPDATE_COLOR, CORRECT_COLOR } from 'actions/color';
import colorReducer from 'reducers/color';

const initialBackgroundColor = '#EEEEEE';
const initialTextColor = '#747474';
const initialBackgroundColorHSL = colorUtils.str2hsl(initialBackgroundColor);
const initialTextColorHSL = colorUtils.str2hsl(initialTextColor);
const initialState = {
  textColor: {
    isValueValid: true,
    value: initialTextColor,
    isHueValid: true,
    hue: initialTextColorHSL.h.toString(),
    isSaturationValid: true,
    saturation: initialTextColorHSL.s.toString(),
    isLightnessValid: true,
    lightness: initialTextColorHSL.l.toString()
  },
  fontSize: {
    isValid: true,
    value: '16'
  },
  isFontBold: false,
  backgroundColor: {
    isValueValid: true,
    value: initialBackgroundColor,
    isHueValid: true,
    hue: initialBackgroundColorHSL.h.toString(),
    isSaturationValid: true,
    saturation: initialBackgroundColorHSL.s.toString(),
    isLightnessValid: true,
    lightness: initialBackgroundColorHSL.l.toString()
  },
  accessibilityLevel: 'AA',
  isInputChanged: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TEXT_COLOR:
      return {
        ...state,
        textColor: colorReducer(state.textColor, {
          type: UPDATE_COLOR,
          field: action.field,
          value: action.value
        }),
        isInputChanged: true
      };

    case CORRECT_TEXT_COLOR:
      return {
        ...state,
        textColor: colorReducer(state.textColor, {
          type: CORRECT_COLOR
        })
      };

    case UPDATE_FONT_SIZE:
      return {
        ...state,
        fontSize: {
          isValid: numberUtils.isIntegerInRange(action.value, MIN_FONT_SIZE),
          value: action.value
        },
        isInputChanged: true
      };

    case CORRECT_FONT_SIZE:
      return state;

    case TOGGLE_FONT_WEIGHT:
      return {
        ...state,
        isFontBold: !state.isFontBold,
        isInputChanged: true
      };

    case UPDATE_BACKGROUND_COLOR:
      return {
        ...state,
        backgroundColor: colorReducer(state.backgroundColor, {
          type: UPDATE_COLOR,
          field: action.field,
          value: action.value
        }),
        isInputChanged: true
      };

    case CORRECT_BACKGROUND_COLOR:
      return {
        ...state,
        textColor: colorReducer(state.backgroundColor, {
          type: CORRECT_COLOR
        })
      };

    case UPDATE_ACCESSIBILITY_LEVEL:
      return {
        ...state,
        accessibilityLevel: action.value,
        isInputChanged: true
      };

    default:
      return state;
  }
};