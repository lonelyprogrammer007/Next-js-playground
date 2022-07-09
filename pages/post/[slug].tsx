import { GetStaticProps } from 'next'
import client from '../../client'
import { Post } from '../../types'

type Props = {
	post: Post
}

const PostComponent = ({ post }: Props) => {
	return <div>Post</div>
}

export default PostComponent

export const getStaticPaths = async () => {
	/*
	TODO: leer esto https://www.sanity.io/docs/getting-started
	para poder entender el query de abajo y despues comparar esta
	version con la del commit anterior
	*/
	const paths = await client.fetch(
		`*[_type == "post" && defined(slug.current)][].slug.current`
	)

	return {
		paths,
		fallback: 'blocking',
	}
}

export const getStaticProps: GetStaticProps = async (context: any) => {
	// It's important to default the slug so that it doesn't return "undefined"
	const { slug = '' } = context.params
	const post = await client.fetch(
		`*[_type == "post" && slug.current == $slug][0]`,
		{ slug }
	)
	return {
		props: {
			post,
		},
	}
}
