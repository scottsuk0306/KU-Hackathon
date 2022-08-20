import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faUser, faUsers, faHome } from '@fortawesome/free-solid-svg-icons'

const Navigation = ({ userObj }) => (
  <nav>
    <ul style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}>
      <li>
        <Link to='/' style={{ marginRight: 10 }}>
          <FontAwesomeIcon icon={faTwitter} color={'#04AAFF'} size='2x' />
        </Link>
      </li>
      <li>
        <Link
          to='/profile'
          style={{
            marginLeft: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontSize: 12
          }}
        >
          <FontAwesomeIcon icon={faUser} color={'#04AAFF'} size='2x' />
          <span style={{ marginTop: 10 }}>
            {userObj.displayName
              ? `${userObj.displayName}의 Profile`
              : 'Profile'}
          </span>
        </Link>
      </li>
      <li>
        <Link
          to='/teamview'
          style={{
            marginLeft: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontSize: 12
          }}
        >
          <FontAwesomeIcon icon={faUsers} color={'#04AAFF'} size='2x' />
          <span style={{ marginTop: 10 }}>
            {userObj.displayName
              ? `팀 모집하기`
              : '팀 모집하기'}
          </span>
        </Link>
            </li>
            <li>
        <Link
          to='/teamdetail'
          style={{
            marginLeft: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontSize: 12
          }}
        >
          <FontAwesomeIcon icon={faHome} color={'#04AAFF'} size='2x' />
          <span style={{ marginTop: 10 }}>
            {userObj.displayName
              ? `나의 팀`
              : '나의 팀'}
          </span>
        </Link>
      </li>
    </ul>
  </nav>
)
export default Navigation
