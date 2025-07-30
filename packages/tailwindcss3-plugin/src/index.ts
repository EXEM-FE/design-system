import { tokens } from "exem-design-token-test"
import plugin from "tailwindcss/plugin"

/**
 * EXEM 디자인 시스템 Tailwind CSS(v3.x) 플러그인
 *
 * @exem/design-token의 토큰들을 활용하여 Tailwind 테마를 확장하고
 * 동적 그라데이션 유틸리티를 제공합니다.
 *
 * 제공 기능:
 * - 색상: ...tokens.color (모든 디자인 토큰 색상)
 * - 반경: ...tokens.radius (border-radius 토큰)
 * - 그림자: ...tokens.shadow (box-shadow 토큰)
 * - 타이포그래피: text-header-1, text-body-1 등
 * - 동적 그라데이션: bg-gradient-exem-logo-[to_right] 등
 * - 브레이크포인트: ...tokens.breakpoint (반응형 스크린)
 */
export default plugin(
  ({ addUtilities, matchUtilities }) => {
    // CSS 변수 로딩을 위한 기본 스타일
    addUtilities({
      "@import": '"@exem/stylesheet"',
    })

    // 그라데이션 정의
    const gradients = {
      "exem-logo": "#FF470E 0%, #3E81F6 50%, #FFE100 100%",
    } as const

    // 동적 그라데이션 유틸리티 생성
    for (const [name, colorStops] of Object.entries(gradients)) {
      matchUtilities(
        {
          [`bg-gradient-${name}`]: direction => ({
            backgroundImage: `linear-gradient(${direction}, ${colorStops})`,
          }),
        },
        {
          values: {
            "to-right": "to right",
            "to-left": "to left",
            "to-top": "to top",
            "to-bottom": "to bottom",
            "to-top-right": "to top right",
            "to-top-left": "to top left",
            "to-bottom-right": "to bottom right",
            "to-bottom-left": "to bottom left",
          },
        }
      )
    }
  },
  {
    theme: {
      screens: {
        ...tokens.breakpoint,
      },
      extend: {
        colors: {
          ...tokens.color,
        },
        borderRadius: {
          ...tokens.radius,
        },
        boxShadow: {
          ...tokens.shadow,
        },
        fontSize: {
          "header-1": ["28px", "140%"],
          "header-2": ["24px", "140%"],
          "title-1": ["20px", "140%"],
          "title-2": ["18px", "140%"],
          "body-1": ["16px", "140%"],
          "body-2": ["14px", "140%"],
          "body-3": ["12px", "140%"],
          caption: ["11px", "140%"],
        },
        fontWeight: {
          regular: "400",
          medium: "500",
          semibold: "600",
          bold: "700",
        },
      },
    },
  }
)
