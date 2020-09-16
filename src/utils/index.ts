export interface RGB {
  r: number
  g: number
  b: number
}

export interface WCAGCompliant {
  small: {
    aa?: boolean
    aaa?: boolean
  }
  large: {
    aa?: boolean
    aaa?: boolean
  }
}

export const hexToRgb = (hex: string): RGB | null => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  const hexValue = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b
  })

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexValue)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      }
    : null
}

export const luminance = (r: number, g: number, b: number): number => {
  const a = [r, g, b].map(v => {
    v /= 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
}

export const getWCAGLevels = (ratio: number): WCAGCompliant => {
  return {
    small: {
      aa: ratio < 1 / 4.5,
      aaa: ratio < 1 / 7
    },
    large: {
      aa: ratio < 1 / 3,
      aaa: ratio < 1 / 4.5
    }
  }
}
