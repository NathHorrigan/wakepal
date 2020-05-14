import * as React from 'react'
import Svg, { Defs, Path, LinearGradient, Stop, G, Use } from 'react-native-svg'

export function HealthKitLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <Svg width={20} height={20} viewBox="0 0 396 438" {...props}>
      <Defs>
        <Path
          id="prefix__b"
          d="M358.426 314.613c28.492-22.184 28.489-58.153 0-80.334l-116.938-91.043c-28.493-22.183-74.693-22.18-103.182 0L21.368 234.28c-28.493 22.184-28.489 58.153 0 80.334l116.938 91.043c28.493 22.183 74.693 22.18 103.182 0l116.938-91.043z"
        />
        <Path
          id="prefix__d"
          d="M358.426 251.313c28.492-22.184 28.489-58.153 0-80.334L241.488 79.936c-28.493-22.183-74.693-22.18-103.182 0L21.368 170.98c-28.493 22.184-28.489 58.153 0 80.334l116.938 91.043c28.493 22.183 74.693 22.18 103.182 0l116.938-91.043z"
        />
        <Path
          id="prefix__f"
          d="M358.426 188.013c28.492-22.184 28.489-58.153 0-80.334L241.488 16.636c-28.493-22.183-74.693-22.18-103.182 0L21.368 107.68c-28.493 22.184-28.489 58.153 0 80.334l116.938 91.043c28.493 22.183 74.693 22.18 103.182 0l116.938-91.043z"
        />
        <LinearGradient
          id="prefix__g"
          x1="14.645%"
          x2="85.355%"
          y1="27.806%"
          y2="72.194%"
        >
          <Stop offset="0%" stopColor="#FF5EA9" />
          <Stop offset="100%" stopColor="#FF2314" />
        </LinearGradient>
      </Defs>
      <G fill="none" fillRule="evenodd" transform="translate(8 3)">
        <Use fill="#000" filter="url(#prefix__a)" xlinkHref="#prefix__b" />
        <Path
          fill="#5299DA"
          stroke="#61B3FF"
          strokeLinejoin="square"
          strokeWidth={1.877}
          d="M357.85 313.872c28.008-21.807 28.007-57.046 0-78.852L240.91 143.977c-28.152-21.919-73.877-21.918-102.029 0L21.945 235.02c-28.01 21.806-28.008 57.046 0 78.852l116.937 91.043c28.153 21.919 73.878 21.918 102.03 0l116.937-91.043z"
        />
        <Use fill="#000" filter="url(#prefix__c)" xlinkHref="#prefix__d" />
        <Path
          fill="#52CEDA"
          stroke="#57DAE6"
          strokeLinejoin="square"
          strokeWidth={1.877}
          d="M357.85 250.572c28.008-21.807 28.007-57.046 0-78.852L240.91 80.677c-28.152-21.919-73.877-21.918-102.029 0L21.945 171.72c-28.01 21.806-28.008 57.046 0 78.852l116.937 91.043c28.153 21.919 73.878 21.918 102.03 0l116.937-91.043z"
        />
        <Use fill="#000" filter="url(#prefix__e)" xlinkHref="#prefix__f" />
        <Path
          fill="#FFF"
          stroke="#E6E6E6"
          strokeLinejoin="square"
          strokeWidth={1.877}
          d="M357.85 187.272c28.008-21.807 28.007-57.046 0-78.852L240.91 17.377c-28.152-21.919-73.877-21.918-102.029 0L21.945 108.42c-28.01 21.806-28.008 57.046 0 78.852l116.937 91.043c28.153 21.919 73.878 21.918 102.03 0l116.937-91.043z"
        />
        <Path
          fill="url(#prefix__g)"
          d="M119.94 87.733c-15.92 12.63-15.92 33.105 0 45.735 30.4 24.114 101.157 12.888 108.495 7.068 7.338-5.821 21.49-61.95-8.91-86.064-15.921-12.63-41.734-12.63-57.654 0-8.257 6.55-12.232 15.21-11.924 23.792-10.814-.239-21.743 2.914-30.006 9.47z"
        />
      </G>
    </Svg>
  )
}