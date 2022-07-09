import Image from 'next/image'
import Link from 'next/link'

type Props = {}

const Header = (props: Props) => {
	return (
		<header className='header'>
			<div className='header__first-container'>
				<Link href={'/'}>
					<a className='header__logo-link-container'>
						<Image
							src='/medium-logo.svg'
							width={162}
							objectFit='contain'
							height={40}
							alt='medium logo'
						/>
					</a>
				</Link>
				<div className='header__link-container'>
					<h3 className='header__link'>About</h3>
					<h3 className='header__link'>Contact</h3>
					<h3 className='header__link header__link--rounded header__link--bg-green text-white'>
						Follow
					</h3>
				</div>
			</div>
			<div className='header__second-container'>
				<h3 className='header__link hidden md:inline-flex'>Sign In</h3>
				<h3 className='header__link header__link--rounded header__link--border-green'>
					Get Started
				</h3>
			</div>
		</header>
	)
}

export default Header
