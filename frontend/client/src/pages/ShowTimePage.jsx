import Notice from '../components/atoms/Notice'
import HeroSummary from '../components/molecules/HeroSummary'
import FilterToolbar from '../components/molecules/FilterToolbar'
import ShowTimeEditor from '../components/organisms/ShowTimeEditor'
import ShowTimeList from '../components/organisms/ShowTimeList'
import ShowTimeLayout from '../components/templates/ShowTimeLayout'
import useShowTimes from '../hooks/useShowTimes'

function ShowTimePage() {
  const {
    filters,
    showTimes,
    pagination,
    options,
    form,
    loading,
    saving,
    message,
    error,
    updateFilter,
    updateForm,
    resetForm,
    editShowTime,
    saveShowTime,
    deleteShowTime,
  } = useShowTimes()

  return (
    <ShowTimeLayout
      hero={<HeroSummary totalElements={pagination.totalElements} />}
      filters={<FilterToolbar filters={filters} onFilterChange={updateFilter} />}
      notice={<Notice message={error || message} type={error ? 'error' : 'success'} />}
      list={
        <ShowTimeList
          loading={loading}
          showTimes={showTimes}
          pagination={pagination}
          onEdit={editShowTime}
          onDelete={deleteShowTime}
          onPageChange={(page) => updateFilter('page', page)}
        />
      }
      editor={
        <ShowTimeEditor
          form={form}
          options={options}
          saving={saving}
          onChange={updateForm}
          onReset={resetForm}
          onSubmit={saveShowTime}
        />
      }
    />
  )
}

export default ShowTimePage
