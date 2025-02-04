/*
 * This is used to wrap a Table of Contents (toc) as returned
 * from the mdxLoader method (see shared/mdx/loader.js)
 * It is NOT for wrapping plain markdown/mdx
 */
import { useState, useEffect, Fragment } from 'react'

// See: https://mdxjs.com/guides/mdx-on-demand/
import { run } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime.js'

const TocWrapper = ({ toc, app }) => {
  const [mdxModule, setMdxModule] = useState()

  useEffect(() => {
    ;(async () => {
      setMdxModule(await run(toc, runtime))
    })()
  }, [toc])

  // React component for MDX content
  const MdxContent = mdxModule ? mdxModule.default : Fragment
  // Don't render an empty toc
  const children = typeof MdxContent === 'function' ? MdxContent().props.children : false

  return children ? (
    <div
      className={`
      mdx mdx-toc text-base-content text-lg lg:text-xl
      sticky top-16 max-h-screen overflow-y-auto
      border-2 bg-base-200 bg-opacity-30 p-4 rounded-lg border-base-200
    `}
    >
      {mdxModule && <MdxContent components={{}} />}
    </div>
  ) : null
}

export default TocWrapper
