import React from 'react'
import Svg, { Path } from 'react-native-svg'
import { Icon } from './base'

const FriendsIcon: Icon = ({ fill = 'white' }) => (
  <Svg width={37} height={26} viewBox="0 0 37 26" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.325 7.672h30.211c.6 0 1.127.399 1.29.977l1.667 5.887.03.21a.774.774 0 01-.498.723l-.001.001a.774.774 0 01-.957-.348L33.342 12l-.495 12.011a1.13 1.13 0 01-1.129 1.084h-.001c-.593 0-1.08-.461-1.125-1.052-.103-1.304-.376-4.422-.458-5.657-.034-.512-.41-.814-.816-.814-.365 0-.775.302-.81.814-.083 1.235-.356 4.353-.458 5.657a1.132 1.132 0 01-1.125 1.052h-.001a1.13 1.13 0 01-1.13-1.084c-.13-3.136-.655-13.17-.655-13.17h-2.517s-.526 10.034-.656 13.17a1.13 1.13 0 01-1.129 1.084h-.002c-.594 0-1.079-.461-1.124-1.052-.103-1.304-.376-4.422-.458-5.657-.035-.512-.445-.814-.81-.814h-.006c-.365 0-.777.302-.81.814-.083 1.235-.356 4.353-.458 5.657a1.133 1.133 0 01-1.125 1.052h-.001a1.13 1.13 0 01-1.13-1.084c-.13-3.136-.655-13.17-.655-13.17h-2.535s-.526 10.034-.656 13.17a1.13 1.13 0 01-1.129 1.084h-.002c-.594 0-1.08-.461-1.124-1.052-.103-1.304-.376-4.422-.459-5.657-.034-.512-.444-.814-.81-.814-.406 0-.782.302-.815.814-.083 1.235-.356 4.353-.458 5.657a1.133 1.133 0 01-1.125 1.052h-.002a1.13 1.13 0 01-1.129-1.084L3.52 12l-1.725 3.122a.774.774 0 01-.957.348l-.002-.001a.774.774 0 01-.498-.724l.03-.21L2.036 8.65c.164-.578.69-.977 1.29-.977zm4.552-6.7a3.016 3.016 0 010 6.031 3.016 3.016 0 010-6.03zm21.108 0a3.016 3.016 0 000 6.031 3.016 3.016 0 000-6.03zm-10.545 0a3.016 3.016 0 010 6.031 3.016 3.016 0 010-6.03z"
      fill={fill}
      fillOpacity={0.9}
    />
  </Svg>
)

export const Friends = React.memo(FriendsIcon)
