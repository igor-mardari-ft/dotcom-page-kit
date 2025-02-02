import React from 'react'
import { ariaSelected } from '../../utils'
import { THeaderProps } from '../../interfaces'
import { TNavMenuItem } from '@financial-times/dotcom-types-navigation'

const SubNavigation = (props: THeaderProps) => (
  <SubNavigationWrapper>
    <BreadCrumb items={props.data.breadcrumb} />
    <SubSections items={props.data.subsections} />
    <SubSections items={props.data['subsections-right']} rightAlignment={true} />
  </SubNavigationWrapper>
)

const SubNavigationWrapper = (props) => (
  <div
    className="o-header__subnav"
    role="navigation"
    aria-label="Sub navigation"
    data-o-header-subnav
    data-trackable="header-subnav">
    <div className="o-header__container">
      <div className="o-header__subnav-wrap-outside">
        <div className="o-header__subnav-wrap-inside" data-o-header-subnav-wrapper>
          <div className="o-header__subnav-content">{props.children}</div>
        </div>
        {/* Implements subNavigation scrolling at smaller viewports */}
        <button
          className="o-header__subnav-button o-header__subnav-button--left"
          title="scroll left"
          aria-label="scroll left"
          aria-hidden="true"
          disabled
        />
        <button
          className="o-header__subnav-button o-header__subnav-button--right"
          title="scroll right"
          aria-label="scroll right"
          aria-hidden="true"
          disabled
        />
      </div>
    </div>
  </div>
)

const BreadCrumb = ({ items }: { items: TNavMenuItem[] }) => (
  <ol
    className="o-header__subnav-list o-header__subnav-list--breadcrumb"
    aria-label="Breadcrumb"
    data-trackable="breadcrumb">
    {items.map((item, index) => {
      const selected = item.selected ? 'o-header__subnav-link--highlight' : ''

      return (
        <li className="o-header__subnav-item" key={`item-${index}`}>
          <a
            className={`o-header__subnav-link ${selected}`}
            href={item.url}
            {...ariaSelected(item)}
            data-trackable={item.label}>
            {item.label}
          </a>
        </li>
      )
    })}
  </ol>
)

const SubSections = ({ items, rightAlignment }: { items: TNavMenuItem[]; rightAlignment?: boolean }) => {
  if (!items || items.length === 0) {
    return null
  }

  return (
    <ul
      className={
        'o-header__subnav-list o-header__subnav-list--children' +
        (rightAlignment ? ' o-header__subnav-list--right' : '')
      }
      aria-label={rightAlignment ? 'Additional Sub Navigation' : 'Subsections'}
      data-trackable="subsections">
      {items.map((item, index) => {
        const selected = item.selected ? 'o-header__subnav-link--highlight' : ''

        return (
          <li className="o-header__subnav-item" key={`item-${index}`}>
            <a
              className={`o-header__subnav-link ${selected}`}
              href={item.url}
              {...ariaSelected(item)}
              data-trackable={item.label}>
              {item.label}
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export { SubNavigation }
