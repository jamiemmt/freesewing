import chai from 'chai'
import { Pattern } from '../src/index.mjs'

const expect = chai.expect

describe('Hooks', () => {
  it('Should contain all hooks', () => {
    const pattern = new Pattern()
    const h = pattern.hooks
    const test = {
      preInit: [],
      postInit: [],
      preDraft: [],
      preSetDraft: [],
      prePartDraft: [],
      postPartDraft: [],
      postSetDraft: [],
      postDraft: [],
      preSample: [],
      postSample: [],
      preRender: [],
      postLayout: [],
      postRender: [],
      insertText: [],
    }
    expect(h).to.eql(test)
  })
})
