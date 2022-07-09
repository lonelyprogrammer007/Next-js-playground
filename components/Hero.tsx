type Props = {}

const Hero = (props: Props) => {
	return (
		<div className='hero'>
			<div className='hero__message-container'>
				<h1 className='hero__text'>
					<span className='hero__text--underline'>Medium</span> is a place to
					write, read, and connect
				</h1>
				<h2 className='hero__text--small'>
					It&apos;s easy and free to post your thinking on any topic and connect
					with millions of readers.
				</h2>
			</div>
			<div className='hero__logo-container'>
				<img
					className='hero__logo'
					src='https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png'
					alt='medium logo'
				/>
			</div>
		</div>
	)
}

export default Hero
